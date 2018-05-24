import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import GameRoomCreating from './components/GameRoomCreating/GameRoomCreating';
import GameRoom from './components/GameRoom/GameRoom';

import './App.css';

// TODO use Redux !

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={GameRoomCreating} />
        <Route exact path="/game-room/:gameRoomId" component={GameRoom} />
      </Switch>
    );
  }
}

export default App;
