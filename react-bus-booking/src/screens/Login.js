import axios from "axios";
import React, { useState } from "react";
import { baseUrl, failure, success } from "../utils";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return failure("All fields are required");
    }

    axios
      .post(baseUrl + `/user/login?email=${email}&password=${password}`, {})
      .then((response) => {
        if (response.status == "200") {
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("name", JSON.stringify(response.data.firstName));
          localStorage.setItem("userId", JSON.stringify(response.data.userId));
          success("Login Successful");
          navigate("/");
        } else {
          failure("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
        failure("Invalid credentials");
      });
  };

  return (
    <div className="center-card">
      <div className="my-card">
        <form>
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="d-grid gap-2 my-2">
            <button type="submit" className="btn btn-dark" onClick={loginUser}>
              Login
            </button>
          </div>
        </form>
        <Link to="/signup">Don't have an account?</Link>
      </div>
    </div>
  );
}

export default Login;
