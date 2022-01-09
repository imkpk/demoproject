import React from "react";
import { Link } from "react-router-dom";

function BusList({ list, dateOfJourney }) {
  return (
    <div>
      <ul className="list-group">
        {list.map((bus) => {
          return (
            <Link key={bus.busId} to={`/book/${bus.busId}/${dateOfJourney}`}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {bus.busName}
                <span className="badge bg-primary rounded-pill">
                  {bus.duration}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default BusList;
