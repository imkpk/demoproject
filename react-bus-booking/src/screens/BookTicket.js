import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, success } from "../utils";

import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function BookTicket() {
  const navigate = useNavigate();

  const { busId: id, dateOfJourney: date } = useParams();
  const [busDetails, setBusDetails] = useState({});
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [userId, setUserId] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");
  const [busId, setBusId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkAvailableBuses = async (busId, dateOfJourney) => {
    axios
      .get(baseUrl + `/ticket/${busId}/${dateOfJourney}`)
      .then((response) => {
        setSeatsAvailable(response.data);
      })
      .catch((e) => console.log(e));
  };
  const loadBusDetails = async (busId) => {
    setIsLoading(true);
    axios
      .get(baseUrl + `/bus/${busId}`)
      .then((response) => {
        setBusDetails(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setBusDetails(null);
        setIsLoading(false);
      });
  };

  const bookTicket = async () => {
    axios
      .post(baseUrl + `/ticket/`, {
        date,
        status: 1,
        bus: { busId },
        user: { userId },
      })
      .then((response) => {
        success("Ticket booked successfully");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setBusId(id);
    setDateOfJourney(date);
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (!userId) {
      return navigate("/login");
    }
    setUserId(userId);

    if (busId && dateOfJourney) {
      loadBusDetails(busId);
      checkAvailableBuses(busId, dateOfJourney);
    }
  }, [busId, dateOfJourney]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card p-4 booking-card">
          {busDetails ? (
            <>
              <h1>{busDetails.busName}</h1>
              <h3>Duration - {busDetails.duration}</h3>
              <h5>Start time - {busDetails.startTime}</h5>
              <h5>End time - {busDetails.endTime}</h5>
              <h5 className="bg-info fare">{busDetails.fare} Rupees</h5>
              <h5
                style={{ width: "max-content" }}
                className={
                  "text-white p-1 " +
                  (seatsAvailable > 0 ? "bg-success" : "bg-danger")
                }
              >
                Seats Available - {seatsAvailable}
              </h5>
              <button
                disabled={seatsAvailable < 0}
                className="btn btn btn-primary mt-3"
                onClick={bookTicket}
              >
                Book Ticket
              </button>
            </>
          ) : (
            <h2>We are sorry, could'nt find anything</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default BookTicket;
