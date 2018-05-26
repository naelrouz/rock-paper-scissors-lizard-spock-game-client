import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6

import './GameSpace.css';
import SelectedGestures from '../SelectedGestures/SelectedGestures';

import rockImg from '../../img/gestures/rock.png';
import paperImg from '../../img/gestures/paper.png';
import scissorsImg from '../../img/gestures/scissors.png';
import spockImg from '../../img/gestures/spock.png';
import lizardImg from '../../img/gestures/lizard.png';

import events from '../../eventConstants';

const gestures = [
  { name: 'rock', img: rockImg },
  { name: 'paper', img: paperImg },
  { name: 'scissors', img: scissorsImg },
  { name: 'spock', img: spockImg },
  { name: 'lizard', img: lizardImg }
];

// NOTE game process
// - select gesture
// - not selected gestures > hide

class GameSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGesture: null,
      opponentGesture: null,
      // gameResult: null,
      resultMessage: null,
      errorMessage: null
    };
  }

  componentWillMount() {
    const { socket } = this.props;
    socket.on(events.GAME_OWER, async gameResult => {
      console.log('gameResult:', gameResult);

      await this.setState({ gameResult });

      const player = gameResult.players.find(player => player.id === socket.id);
      const opponent = gameResult.players.find(
        player => player.id !== socket.id
      );
      console.log('player:', player);
      console.log('opponent:', opponent);

      let playerStatus = 'Draw:';

      if (player.winner) {
        playerStatus = 'You winner:';
      }
      if (opponent.winner) {
        playerStatus = 'You loser:';
      }

      const resultMessage = `${playerStatus} ${
        gameResult.message
          ? gameResult.message
          : 'there is no winner and no loser'
      } `;

      await this.setState({ resultMessage });
      await this.setState({ opponentGesture: opponent.selectedGesture });
    });

    socket.on(events.ERROR, async error => {
      const errorMessage = null;
      await this.setState({ errorMessage });
    });
  }
  // gesture selection
  async handlerSelectGesture({ currentTarget }) {
    // console.log('currentTarget:', currentTarget);

    if (this.state.selectedGesture) {
      return;
    }

    Array.from(currentTarget.parentNode.childNodes).forEach(el => {
      el.classList.remove('active');
    });

    currentTarget.classList.add('active');
    const gesture = currentTarget.getAttribute('data-gesture');

    await this.setState({ selectedGesture: gesture });
    await console.log('selectedGesture:', this.state.selectedGesture);

    const {
      props: { socket, gameRoomId }
    } = this;
    // message to the server selected gesture
    socket.emit(events.SELECT_GESTURE, { gesture, gameRoomId });
  }

  render() {
    return (
      <div className="game_space">
        <SelectedGestures
          gestures={gestures}
          selectedGesture={this.state.selectedGesture}
          opponentGesture={this.state.opponentGesture}
        />
        <h1 className="game_space__result_message">
          {this.state.resultMessage}
        </h1>
        {/* <h1>{this.state.errorMessage}</h1> */}

        <ul className="gestures">
          {gestures.map(item => (
            <li
              className="gestures__item"
              key={item.name}
              onClick={this.handlerSelectGesture.bind(this)}
              data-gesture={item.name}
            >
              <img src={item.img} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GameSpace;
