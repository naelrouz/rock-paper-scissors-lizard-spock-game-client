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
            <img
              src={
                selectedGesture
                  ? gestures.find(el => el.name === selectedGesture).img
                  : waitingImg
              }
              alt="selected gesture player"
            />
            <h2>You chosen</h2>
          </li>
          <li className="selected_gestures__item player_select">
            <img
              src={
                opponentGesture
                  ? gestures.find(el => el.name === opponentGesture).img
                  : waitingImg
              }
              alt="selected gesture player"
            />
            <h2>Opponent chosen</h2>
          </li>
        </ul>
      </div>
    );
  }
}

export default GameSpace;
