import { v4 as uuiv4 } from 'uuid';

export const createGameRoom = () => ({
  id: uuiv4()
});

export const sendMessage = ({ message, gameRoomId }) => ({
  id: uuiv4(),
  time: new Date(Date.now()),
  message,
  gameRoomId
});

export const getTime = date => {
  const minutes = `0 ${date.getMinutes()}`.slice(-2);
  return `${date.getHours()}:${minutes}`;
};
