# Chat App

A lightweight real-time chat application demonstrating modern web communication using **React**, **Node.js**, and **Socket.io**.

The project focuses on building a responsive interface and a real-time messaging system powered by WebSockets. It serves as a practical example of how a modern frontend can interact with a Node.js backend to deliver instant communication between users.

---

## Overview

This application demonstrates the core concepts behind real-time web applications:

* instant message delivery using WebSockets
* client-server communication between React and Node.js
* responsive UI suitable for desktop and mobile devices
* a simple but scalable project structure

The goal of this project was to explore how real-time communication works in modern JavaScript applications.

---

## Features

* Real-time messaging powered by **Socket.io**
* Responsive user interface built with **React**
* Notifications when users join or leave the chat
* Simple and readable project architecture
* Lightweight and easy to run locally

---

## Tech Stack

| Layer                   | Technology           |
| ----------------------- | -------------------- |
| Frontend                | React.js             |
| Backend                 | Node.js + Express.js |
| Real-time communication | Socket.io            |
| Styling                 | HTML / CSS           |

---

## Project Structure

```
Chat-app
│
├── client        # React frontend
├── server        # Node.js + Express backend
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/M1chael-01/Chat-app.git
cd Chat-app
```

Install dependencies:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

Start the development servers:

```bash
cd server
npm start
```

In another terminal:

```bash
cd client
npm start
```

---

## Purpose of the Project

This project was created to demonstrate how to build a **real-time communication system** using the modern JavaScript ecosystem and WebSocket-based technologies.
