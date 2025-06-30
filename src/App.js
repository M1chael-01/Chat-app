import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Import Routes instead of Router for the routing logic
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import Cookies from "js-cookie";

// Import your components
import Home from "./Components/Home";
import LetStart from "./Components/LetStart";
import CreateServer from "./Components/CreateServer";
import JoinServer from "./Components/JoinServer";
import Chat from "./Components/Chat";

const App = () => {

   

  // test backend
const getData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api');
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};







    useEffect(() =>{
        getData();
    },[])

  return (
  <div>
      <Router>
        <Routes>
          <Route path="/" element = {<Home/>} ></Route>
          <Route path="/get-started" element = {<LetStart/>} ></Route>
          <Route path="/create-server" element = {<CreateServer/>} ></Route>
          <Route path="/join-server" element = {<JoinServer/>} ></Route>
          <Route path="/chat" element = {<Chat/>} ></Route>
        </Routes>
        </Router>
  </div>
  )
}

export default App