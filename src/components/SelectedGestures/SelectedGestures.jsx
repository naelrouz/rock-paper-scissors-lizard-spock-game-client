import React, { Component } from 'react';

import './SelectedGestures.css';

import waitingImg from '../../img/gestures/waiting.png';

class GameSpace extends Component {
  showWiner() {
    console.log('?');

    this.props.winer;
  }

  render() {
    const { selectedGesture, opponentGesture, gestures } = this.props;

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
              src={
                opponentGesture
                  ? gestures.find(el => el.name === opponentGesture).img
                  : waitingImg
              }
              alt="selected gesture player"
            />
          </li>
        </ul>
      </div>
    );
  }
}

export default GameSpace;
