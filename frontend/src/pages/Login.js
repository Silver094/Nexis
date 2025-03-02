import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchData } = useAxios();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, statusCode } = await fetchData({
        method: "POST",
        url: "/login",
        options: {
          data: { email, password },
        },
      });
      if (statusCode === 200) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else if (statusCode === 401) {
        alert("Invalid credentials");
      } else if (statusCode === 404) {
        alert("User not found");
        navigate("/register");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleLogin}>
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
