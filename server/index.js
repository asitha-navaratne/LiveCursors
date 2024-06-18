const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;

const connections = {};
const users = {};

const handleMessage = function (bytes, uuid) {
  const message = JSON.parse(bytes.toString());
  console.log(message);
};

const handleClose = function (uuid) {};

wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;
  const uuid = uuidv4();

  connections[uuid] = connection;

  users[uuid] = {
    username: username,
    state: {},
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`);
});
