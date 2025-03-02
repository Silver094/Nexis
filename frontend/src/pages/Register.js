import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { fetchData } = useAxios();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data,statusCode } = await fetchData({
      method: "POST",
      url: "/register",
      options: {
        data: { email, password },
      },
    });
    if (statusCode === 200) {
      alert("User registered successfully");
      localStorage.setItem("token",data.token)
      navigate("/dashboard");
    } else if (statusCode === 409) {
      alert("User already exists");
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
