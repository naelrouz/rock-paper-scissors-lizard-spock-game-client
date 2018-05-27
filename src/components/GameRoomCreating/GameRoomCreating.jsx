import React, { Component } from 'react';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import events from '../../eventConstants';

import './GameRoomCreating.css';
import logo from '../../img/logo.jpg';

// TODO GameRoomCreating
// create GameRoom
// get gameRoomId
// show link to GameRoom
// redirect when the second player joins

class GameRoomCreating extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;

    this.state = {
      socket: null,
      gameRoomId: null,
      gameRoomLink: null
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
    socket.on('disconnect', () => console.log('Disconnect'));

    socket.emit(events.CREATE_GAME_ROOM);

    socket.on(events.NEW_GAME_ROOM_CREATED, ({ gameRoomId }) => {
      const { protocol, hostname, port } = window.location;

      const gameRoomLink = `${protocol}//${hostname}${
        port ? `:${port}` : ''
      }/game-room/${gameRoomId}`;
      this.setState({ gameRoomId, gameRoomLink });

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
    const { gameRoomId, gameRoomLink } = this.state;

    return (
      <div className="game_room_creating">
        <img className="game_room_creating__logo" src={logo} alt="logo" />

        {gameRoomId ? (
          <div className="game_room_creating__game_room_link">
            <h2>{'Link to the GameRoom:'}</h2>
            <h2>
              <a href={gameRoomLink}>{gameRoomLink}</a>
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
