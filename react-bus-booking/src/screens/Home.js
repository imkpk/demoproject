import axios from "axios";
import React, { useState } from "react";
import BusList from "../components/BusList";
import { baseUrl } from "../utils";

function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");

  const [busesList, setBusesList] = useState(null);

  const searchBuses = async () => {
    axios
      .get(baseUrl + `bus/${origin.toLowerCase()}/${destination.toLowerCase()}`)
      .then((response) => {
        if (response.status == 200) {
          setBusesList(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
        setBusesList([]);
      });
  };

  return (
    <div className="home-div">
      <h1 className="m-3 text-white">Book Bus</h1>
      <div className="search-buses">
        <div className="">
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            type="email"
            className="form-control "
            placeholder="Origin"
          />
        </div>
        <div className="">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Destination"
            className="form-control "
          />
        </div>
        <div className="">
          <input
            value={dateOfJourney}
            onChange={(e) => setDateOfJourney(e.target.value)}
            type="date"
            className="form-control "
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <button
          disabled={!origin || !destination || !dateOfJourney}
          type="submit"
          className="btn btn-dark  ms-2"
          onClick={searchBuses}
        >
          Search Buses
        </button>
      </div>

      <hr className="my-4" />

      {/* list  */}
      {busesList &&
        (busesList.length == 0 ? (
          <h2 className="text-white m-3">
            No buses found for the requested route
          </h2>
        ) : (
          <div className="buses-list">
            <h3 className="text-white">Results:</h3>
            <BusList list={busesList} dateOfJourney={dateOfJourney} />
          </div>
        ))}
    </div>
  );
}

export default Home;
