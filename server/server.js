const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app); 


const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, "servers.json");


function readServersFromFile() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading servers from file:", err);
    return [];
  }
}

function writeServersToFile(data) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to servers file:", err);
  }
}

app.post("/create", (req, res) => {
  const { serverName, password, port } = req.body;

  if (!serverName || !password || !port) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const servers = readServersFromFile();
  const serverData = {
    id: servers.length + 1,
    serverName,
    password,
    port,
    createdAt: new Date()
  };

  servers.push(serverData);
  writeServersToFile(servers);

  res.json({ message: "Server created", server: serverData });
});

app.post("/join", (req, res) => {
  const { userName, server, port, password } = req.body;

  if (!userName || !server || !port || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const servers = readServersFromFile();

  const match = servers.find(
    (s) => s.serverName === server && s.password === password && s.port == port
  );

  if (match) {
    return res.json({
      message: `Welcome ${userName}`,
      joined: true,
      server: match
    });
  } else {
    return res.status(403).json({ error: "Invalid server credentials" });
  }
});

app.post("/validateServer", (req, res) => {
  const { server, port, password } = req.body;
  const servers = readServersFromFile();

  const match = servers.find(
    (s) => s.serverName === server && s.password === password && s.port == port
  );

  if (match) {
    res.json({ valid: true });
  } else {
    res.status(403).json({ valid: false });
  }
});

app.get("/servers", (req, res) => {
  const servers = readServersFromFile();
  res.json(servers);
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ server, userName }) => {
    console.log(`${userName} joined room: ${server}`);
    socket.join(server);

    io.to(server).emit("message", `${userName} has joined the room!`);
  });

  socket.on("chatMessage", (msg) => {
    console.log("Received message:", msg);
    io.to(msg.server).emit("chatMessage", msg);
  });

  socket.on("leaveRoom", ({ server, userName }) => {
    console.log(`${userName} left room: ${server}`);
    socket.leave(server); 

    io.to(server).emit("message", `${userName} has left the room!`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


server.listen(5000, () => {
  console.log("Server running on port 5000");
});
