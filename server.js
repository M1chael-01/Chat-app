
const express = require("express");
const http = require("http");
const webSocket = require("ws");


const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({server});

//access to folder
app.use(express.static("public"));

// handle connection
wss.on("connection" , (ws) =>{
    // handle message
    ws.on("message" , (message) =>{
        wss.clients.forEach((client) =>{
            // broadcast messages to all users
            if(client.readyState === webSocket.OPEN) {
                client.send(message);
            }
        })
    })
})

const port = 3000;


server.listen(port, () =>{
    console.log(`Server is listening to port ${port}`);
})