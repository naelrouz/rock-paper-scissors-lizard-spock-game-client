import React, { Component } from 'react';
import io from 'socket.io-client';

import './GameRoom.css';

import GameSpace from '../GameSpace/GameSpace';
import GameRoomChat from '../GameRoomChat/GameRoomChat';

// import logo from './logo.svg';
// import { subscribeToTimer } from '../../api';

import events from '../../eventConstants';

// TODO if player 2 is connect > redirect to game room

class GameRoom extends Component {
  constructor(props) {
    super(props);
    // subscribeToTimer(500, (err, timestamp) => (this.state.timestamp = 0));

    console.log('props', this.props);

    this.state = {
      socket: null,
      gameRoomId: null,
      gameIsStart: false
    };
  }
  componentWillMount() {
    const {
      props: {
        match: {
          params: { gameRoomId }
        }
      }
    } = this;
    this.setState({ gameRoomId });
    this.enterToGameRoom(gameRoomId);
  }

  enterToGameRoom(gameRoomId) {
    const socket = io('http://localhost:8000');

    this.setState({ socket });

    socket.on('connect', () => {
      console.log('Connected. id:', socket.id);

      // console.log('socket:', socket.id);
      // console.log('socket:', socket.json.id);

      socket.on('disconnect', this.reconnectUserInfo);

      // entrance to the GameRoom with the GameRoomId taken from the link
      socket.emit(events.ENTER_TO_GAME_ROOM, { gameRoomId });
    });
  }

  render() {
    const { gameRoomId, socket } = this.state;

    return (
      <div className="game_room">
        <div>
          <GameSpace socket={socket} gameRoomId={gameRoomId} />
          <GameRoomChat socket={socket} gameRoomId={gameRoomId} />
        </div>
      </div>
    );
  }
}

export default GameRoom;

// <Login
//             socket={socket}
//             setUser={this.setUser}
//             verified={this.setUser}
//           />
