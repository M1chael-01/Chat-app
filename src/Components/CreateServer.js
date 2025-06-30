import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- import useNavigate
import '../styles/CreateServer.css';

const CreateServer = () => {
  const ports = [500, 8080, 3000, 4000];
  const navigate = useNavigate();  // <-- initialize navigate

  const initialState = {
    server: '',
    password: '',
    port: ports[0]
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_SERVER':
        return { ...state, server: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'SET_PORT':
        return { ...state, port: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const createServerSubmit = async () => {
    const { server, password, port } = state;

    if (server.trim() && password.trim()) {
      const data = {
        serverName: server,
        password: password,
        port: port
      };
      try {
        const response = await fetch("http://localhost:5000/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        navigate("/join-server");  // <-- use navigate, not navigator
      } catch (err) {
        console.error("Error creating server:", err);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <section className="create-server">
      <div className="create-server-header">
        <h2>Let's create your private server</h2>
        <p>Define a group name, password, and port to launch a secure chat server.</p>
      </div>

      <div className="create-server-card">
        <form className="create-server-form" onSubmit={(e) => e.preventDefault()}>
          <p>Server name</p>
          <input
            type="text"
            placeholder="Server Name"
            value={state.server}
            onChange={(e) =>
              dispatch({ type: 'SET_SERVER', payload: e.target.value })
            }
          />

          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
            }
          />

          <p>Choose a port</p>
          <select
            value={state.port}
            onChange={(e) =>
              dispatch({ type: 'SET_PORT', payload: Number(e.target.value) }) // <-- convert to number here
            }
          >
            {ports.map((port) => (
              <option key={port} value={port}>
                {port}
              </option>
            ))}
          </select>

          <button type="submit" onClick={createServerSubmit}>
            Create Server
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateServer;
