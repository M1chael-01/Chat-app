import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import '../styles/Chat.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const cookie = Cookies.get("Data");
    if (cookie) {
      const cookieData = JSON.parse(cookie);
      const { userName, server, port, password } = cookieData;

      setUserName(userName);

      fetch('http://localhost:5000/validateServer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ server, port, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            socket.emit("joinRoom", { server, userName });
          } else {
            navigate('/');  
          }
        })
        .catch(err => {
          console.error(err);
          navigate('/');  
        });
    } else {
      navigate('/');  
    }
  }, [navigate]);

  const handleSend = () => {
    if (message.trim()) {
      const cookie = Cookies.get("Data");
      if(cookie) {
          const { server,userName } = JSON.parse(cookie); 

        
          socket.emit("chatMessage", { user: userName, text: message, server });

          setMessage('');
      }
    }
  };

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chatMessage"); 
    };
  }, []);

  const handleRemoveServer = () => {
    Cookies.remove("Data");


    const cookie = Cookies.get("Data");
    if (cookie) {
      const { server } = JSON.parse(cookie);
      socket.emit("leaveRoom", { server, userName });
    }

    navigate('/');
  };

  return (
    <section className="chat">
      <div className="chat-header">
        <h2>Welcome to the Chat Room</h2>
        <p>Feel free to talk with your group securely.</p>


        <button onClick={handleRemoveServer} className="remove-server-btn">
          Leave the server
        </button>
      </div>

      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.user === 'You' ? 'me' : 'other'}`}>
              <span className="chat-user">{msg.user}</span>
              <div className="chat-text">{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
