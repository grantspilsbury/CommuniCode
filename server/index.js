const http = require('http');
const path = require('path');
const socket = require('socket.io');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.Server(app);
const io = socket(server);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('client:joinChannel', (channelId, cb) => {
    console.log('Trying to join channel');
    socket.join(channelId, (err) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        console.log('Joined channel');
        cb(null);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnecting');
  });
});

