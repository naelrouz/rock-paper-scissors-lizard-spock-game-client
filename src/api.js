import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const NEW_MESSAGE = 'NEW_MESSAGE';
const CHANGE_USERNAME = 'CHANGE_USERNAME';

export const subscribeToTimer = (interval, cb) => {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', interval);
};

export const sendMessage = (interval, cb) => {
  socket.on(NEW_MESSAGE, timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
};
