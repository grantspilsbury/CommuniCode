const http = require('http');
const socket = require('socket.io');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.Server(app);
const io = socket(server);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});