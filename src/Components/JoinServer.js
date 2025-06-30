import "../styles/JoinServer.css";

import { useState, useReducer } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const JoinServer = () => {
  const ports = [500, 8080, 3000, 4000];

  const [hiddenContent, setHiddenContent] = useState(true);
  const [isAuthenticated, setIsAutenticated] = useState(false);

  const navigate = useNavigate();

  const continueSubmit = () => {
    if (state.userName && state.server) {
      setHiddenContent(false);
    } else {
      alert("Error, please fill out your name and the server");
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USERNAME":
        return { ...state, userName: action.payload };
      case "SET_SERVER":
        return { ...state, server: action.payload };
      case "SET_PORT":
        return { ...state, port: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      default:
        throw new Error("This case isn't defined");
    }
  };

  const inittialState = {
    userName: "",
    server: "",
    password: "",
    port: ""
  };

  const [state, dispatch] = useReducer(reducer, inittialState);

  const joinSubmit = async () => {
    if (state.userName && state.server && state.port && state.password) {
      try {
        const data = {
          userName: state.userName,
          server: state.server,
          port: state.port,
          password: state.password
        };

        const response = await fetch("http://localhost:5000/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.joined !== undefined) {
          navigate("/chat");
          Cookies.set("Data", JSON.stringify(data), { expires: 1 });
        } else {
          alert("Nahh");
        }
      } catch (err) {
        console.error("Join failed:", err);
      }
    } else {
      alert("Please fill in all fields before joining.");
    }
  };

  return (
    <section className="join-server">
      <section className="join-server-header">
        <h2>Join the Server</h2>
        <p>Enter the server details and your name to join an existing chat group.</p>
      </section>

      <section className="join-server-card">
        <form className="join-server-form" onSubmit={(e) => e.preventDefault()}>
          {hiddenContent && (
            <>
              <p>Your Name</p>
              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) =>
                  dispatch({ type: "SET_USERNAME", payload: e.target.value })
                }
              />

              <p>Server Name</p>
              <input
                type="text"
                placeholder="Server Name"
                onChange={(e) =>
                  dispatch({ type: "SET_SERVER", payload: e.target.value })
                }
              />
            </>
          )}

          {hiddenContent && <button onClick={continueSubmit}>Continue</button>}

          {!hiddenContent && (
            <>
              <p>Port</p>
              <select
                value={state.port}
                onChange={(e) =>
                  dispatch({ type: "SET_PORT", payload: Number(e.target.value) })
                }
              >
                <option value="">Select a port</option>
                {ports.map((port) => (
                  <option key={port} value={port}>
                    {port}
                  </option>
                ))}
              </select>

              <p>Password</p>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                }
              />
            </>
          )}

          {!hiddenContent && (
            <>
              <button onClick={joinSubmit} type="submit">
                Join Server
              </button>
              <div onClick={() => setHiddenContent(true)} className="back">
                ⬅️
              </div>
            </>
          )}
        </form>
      </section>
    </section>
  );
};

export default JoinServer;
