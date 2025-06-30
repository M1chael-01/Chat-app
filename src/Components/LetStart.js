import "../styles/LetStart.css";
import { Link } from "react-router";

const LetStart = () => {
  return (
    <div className="letstart">
      {/* Header */}
      <section className="letstart-header">
        <h2>Welcome to ChatSphere</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
        </p>
      </section>

      {/* Options */}
      <section className="letstart-options">
        <main className="letstart-card">
          <h2>Create a Server</h2>
          <p>Set your group name, password, and host a private chat room.</p>
          <Link to = "/create-server"><button>Go ..</button></Link>
        </main>

        <main className="letstart-card">
          <h2>Join a Server</h2>
          <p>Enter an existing group name and password to join the chat.</p>
          <Link to = "/join-server"><button>Go...</button></Link>
        </main>
      </section>
    </div>
  );
};

export default LetStart;
