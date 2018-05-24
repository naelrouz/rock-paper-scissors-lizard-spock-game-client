import React, { Component } from 'react';
import io from 'socket.io-client';

import events from '../../eventConstants';

import './GameRoomCreating.css';

// TODO GameRoomCreating
// create GameRoom
// get gameRoomId
// show link to GameRoom
// redirect when the second player joins

class GameRoomCreating extends Component {
  constructor() {
    super();
    // subscribeToTimer(500, (err, timestamp) => (this.state.timestamp = 0));

    this.state = {
      socket: null,
      gameRoomId: null
    };
  }

  componentWillMount() {
    // this.setState({ test: 'HW!' });
    // var socket = io(serverURI);
    // this.setState({ socket });
    this.initSocket();
    this.createGameRoom();
  }
  initSocket() {
    const socket = io('http://localhost:8000');

    // this.setState({ socket: socket });

    socket.on('connect', () => {
      console.log('Connected');
    });
    socket.on('disconnect', this.reconnectUserInfo);

    socket.emit(events.CREATE_GAME_ROOM);

    socket.on(events.NEW_GAME_ROOM_CREATED, ({ gameRoomId }) => {
      this.setState({ gameRoomId });
      console.log('state.gameRoomId', this.state.gameRoomId);
    });

    socket.on(events.OPPONENT_ENTRANCE_TO_GAME_ROOM, ({ message }) => {
      const { gameRoomId } = this.state;
      console.log('message', message);
      this.props.history.push(`/game-room/${gameRoomId}`);
    });
  }
  createGameRoom() {
    const { socket } = this.state;

    console.log('socket: ', socket);
    // socket.emit(events.CREATE_GAME_ROOM);
  }
  render() {
    const { gameRoomId } = this.state;

    return (
      <div className="game_room_creating">
        {gameRoomId ? (
          <div className="game_room__link">
            <h2>{'Link to the GameRoom:'}</h2>
            <h2>
              <a
                href={`http://localhost:3000/game-room/${gameRoomId}`}
              >{`http://localhost:3000/game-room/${gameRoomId}`}</a>
            </h2>
            <h2>
              {
                'To start the game send this link to your opponent and wait for him to enter.'
              }
            </h2>
          </div>
        ) : (
          <h2>GameRoom creating ...</h2>
        )}
      </div>
    );
  }
}

export default GameRoomCreating;
