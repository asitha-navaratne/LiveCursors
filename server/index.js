const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");

const getRandomCursorColor = require("./helpers/getRandomCursorColor");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;

const connections = {};
const users = {};

const broadcast = function () {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);

    connection.send(message);
  });
};

const handleMessage = function (bytes, uuid) {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];
  user.state = message;

  broadcast();
};

const handleClose = function (uuid) {
  delete connections[uuid];
  delete users[uuid];

  broadcast();
};

wsServer.on("connection", (connection, request) => {
  const { username, id } = url.parse(request.url, true).query;

  connections[id] = connection;

  users[id] = {
    id: id,
    username: username,
    color: getRandomCursorColor(),
    state: {},
  };

  connection.on("message", (message) => handleMessage(message, id));
  connection.on("close", () => handleClose(id));
});

server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`);
});
