import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      axios
        .get(baseUrl + `/user/profile?email=${email}`)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((e) => console.log(e));
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="center-card">
      <div className="my-card">
        <form className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First Name
            </label>
            <input
              value={userInfo.firstName}
              disabled
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name
            </label>
            <input
              value={userInfo.lastName}
              disabled
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              value={userInfo.email}
              disabled
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Contact Number
            </label>
            <input
              value={userInfo.mobileNumber}
              disabled
              type="number"
              className="form-control"
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              State
            </label>
            <input
              value={userInfo.state}
              disabled
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              City
            </label>
            <input
              value={userInfo.city}
              disabled
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Postal Code
            </label>
            <input
              value={userInfo.postalCode}
              disabled
              type="number"
              className="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
