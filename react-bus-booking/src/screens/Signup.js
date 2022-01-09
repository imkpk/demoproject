import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl, JWT_TOKEN } from "../utils";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const success = (message) => toast.success(message);
  const failure = (message) => toast.error(message);

  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("s");
  const [city, setCity] = useState("s");
  const [stateList, setStateList] = useState(null);
  const [cityList, setCityList] = useState(null);

  const loadStates = async () => {
    axios
      .get("https://www.universal-tutorial.com/api/states/India", {
        headers: {
          Authorization: "Bearer " + JWT_TOKEN,
        },
      })
      .then((response) => {
        console.log(response);
        setStateList(response.data);
      })
      .catch((e) => console.log(e));
  };

  const loadCities = async () => {
    axios
      .get(`https://www.universal-tutorial.com/api/cities/${state}`, {
        headers: {
          Authorization: "Bearer " + JWT_TOKEN,
        },
      })
      .then((response) => {
        console.log(response);
        setCityList(response.data);
      })
      .catch((e) => console.log(e));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !postalCode ||
      !phoneNumber ||
      !state ||
      !city
    ) {
      return failure("All fields are required");
    }

    if (confirmPassword !== password) {
      return failure("Passwords do not match");
    }

    axios
      .post(baseUrl + "/user", {
        firstName,
        lastName,
        email,
        city,
        state,
        password,
        postalCode,
        mobileNumber: phoneNumber,
      })
      .then((response) => {
        if (response.status == "201") {
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("name", JSON.stringify(response.data.firstName));
          localStorage.setItem("userId", JSON.stringify(response.data.userId));
          success("Registration Successful");
          navigate("/");
        } else {
          failure("Something went wrong");
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadStates();
  }, []);
  useEffect(() => {
    loadCities();
  }, [state]);

  return (
    <div className="center-card">
      <div className="my-card">
        <form className="row my-2">
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Contact Number
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              State
            </label>
            <select
              name=""
              id=""
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option selected>Select State</option>
              {stateList &&
                stateList.map((state) => (
                  <option value={state.state_name}>{state.state_name}</option>
                ))}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              City
            </label>
            <select
              name=""
              id=""
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option selected>Select City</option>
              {cityList &&
                cityList.map((city) => (
                  <option value={city.city_name}>{city.city_name}</option>
                ))}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Postal Code
            </label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-dark" onClick={registerUser}>
            Register
          </button>
        </form>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Signup;
