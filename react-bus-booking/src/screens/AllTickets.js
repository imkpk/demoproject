import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { baseUrl, success } from "../utils";
import { useNavigate } from "react-router-dom";
function AllTickets() {
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [ticketList, setTicketList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [today, setToday] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    setuserId(id);
    if (id) {
      loadTickets(id);
    } else {
      navigate("/login");
    }
  }, []);

  const loadTickets = async (id) => {
    setIsLoading(true);
    axios
      .get(baseUrl + `/ticket/all/${id}`)
      .then((response) => {
        setTicketList(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const cancelTicket = async (ticketId) => {
    axios
      .put(baseUrl + `/ticket/cancel/${ticketId}/${userId}`, {})
      .then((response) => {
        if (response.status == 200) {
          success("Ticket cancelled Successfully");
          loadTickets(userId);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="center-card">
      <div className="my-card">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Bus Name</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {ticketList &&
              ticketList.length > 0 &&
              ticketList.map((ticket) => {
                return (
                  <tr key={ticket.ticketId}>
                    <th scope="row">{ticket.ticketId}</th>
                    <td>{ticket.bus.busName}</td>
                    <td>{ticket.date}</td>
                    <td>
                      {ticket.status == 0 ? (
                        "Cancelled"
                      ) : today > ticket.date ? (
                        "Travelled"
                      ) : (
                        <button
                          className="btn btn-danger text-white btn-sm"
                          onClick={() => cancelTicket(ticket.ticketId)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default AllTickets;
