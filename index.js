const express = require("express");
const shortid = require("shortid");

const server = express();

let hubs = [];
let lessons = [];

// middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

server.get("/hello", (req, res) => {
  res.status(200).json({ hello: "Web 27" });
});

server.post("/api/hubs", (req, res) => {
  // axios.post(/api/hubs, data) <-- the data from client shows up as the req.body on the server
  const hubInfo = req.body;
  hubInfo.id = shortid.generate();
  hubs.push(hubInfo);

  res.status(201).json(hubInfo);
});

server.get("/api/hubs", (req, res) => {
  res.status(200).json(hubs);
});

// write an endpoint to create lessons
server.post("/api/lessons", (req, res) => {
  const lessonInfo = req.body;

  lessonInfo.id = shortid.generate();
  lessons.push(lessonInfo);
  res.status(201).json(lessonInfo);
});

server.get("/api/lessons", (req, res) => {
  res.status(200).json(lessons);
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n** Server listening on http://localhost:${PORT} **\n`)
);
