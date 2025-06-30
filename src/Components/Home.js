import "../styles/Home.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";


const Home = () => {

  const navigate = useNavigate();

  if(Cookies.get("Data")) {

    navigate("/chat");
  }

  return (
    <section className="home">
      <h1>Chat Online Without Compromising Your Privacy</h1>
      <p>
        Have you ever thought, "I need to chat with someone, but every app seems to be watching"?
        We don’t. Your privacy matters here.
      </p>
      <a href="#chat">
       <Link to= "/get-started"> <button>Start Chatting</button></Link>
      </a>
    </section>
  );
};

export default Home;
