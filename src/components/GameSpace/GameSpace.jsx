import React, { Component } from 'react';
// import classNames from 'classnames';
//

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
      opponentGesture: null
    };
  }

  //
  async handlerSelectGesture({ currentTarget }) {
    // console.log('currentTarget:', currentTarget);

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
    socket.emit(events.SELECT_GESTURE, { gesture, gameRoomId });
  }

  render() {
    // const gesturesItemClasses = classNames({
    //   gestures__item: true
    // });

    return (
      <div className="game_space">
        <SelectedGestures
          gestures={gestures}
          selectedGesture={this.state.selectedGesture}
          opponentGesture={this.state.opponentGesture}
        />
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

// <li className="gestures__item_rock" data-gesture-name="rock">
// Rock
// </li>
// <li className="gestures__item_paper" data-gesture-name="paper">
// Paper
// </li>
// <li className="gestures__item_scissors" data-gesture-name="scissors">
// Scissors
// </li>
// <li className="gestures__item_spock" data-gesture-name="spock">
// Spock
// </li>
// <li className="gestures__item_lizard" data-gesture-name="lizard">
// Lizard
// </li>
