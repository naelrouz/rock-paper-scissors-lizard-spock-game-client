import React, { Component } from 'react';
// import classNames from 'classnames';
//

import './SelectedGestures.css';

import waitingImg from '../../img/gestures/waiting.png';

import events from '../../eventConstants';

// NOTE game process
// - select gesture
// - not selected gestures > hide

class GameSpace extends Component {
  showWiner() {
    console.log('?');

    this.props.winer;
  }

  render() {
    const { selectedGesture, opponentGesture, gestures } = this.props;

    // gestures.find(el => el.name === selectedGesture).img

    console.log('gestures:', gestures);

    return (
      <div className="game_space">
        <ul className="selected_gestures">
          <li className="selected_gestures__item player_select">
            <h2>You chosen</h2>

            <img
              src={
                selectedGesture
                  ? gestures.find(el => el.name === selectedGesture).img
                  : waitingImg
              }
              alt="selected gesture player"
            />
          </li>
          <li className="selected_gestures__item player_select">
            <h2>Opponent chosen</h2>

            <img
              src={opponentGesture ? opponentGesture : waitingImg}
              alt="selected gesture player"
            />
          </li>
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
