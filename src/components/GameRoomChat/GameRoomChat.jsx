import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';

import events from '../../eventConstants';

import './GameRoomChat.css';

class GameRoomChat extends Component {
  constructor() {
    super();

    this.state = {
      messageList: [
        {
          author: 'Bot',
          type: 'text',
          data: {
            text: 'Welcome to the game room'
          }
        }
      ]
    };
  }

  componentWillMount() {
    const { socket, gameRoomId } = this.props;

    // subscribe to a new chat messages
    socket.on(events.NEW_MESSAGE, async ({ text }) => {
      await this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: 'them',
            type: 'text',
            data: { text }
          }
        ]
      });
    });
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  _sendMessage(text) {
    if (text.length < 0) {
      return; // if the message is empty
    }

    const { socket, gameRoomId } = this.props;

    //  send message to the server
    socket.emit(events.SEND_MESSAGE, { text, gameRoomId });

    this.setState({
      messageList: [
        ...this.state.messageList,
        {
          author: 'me',
          type: 'text',
          data: { text }
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <Launcher
          className="game_room_chat"
          agentProfile={{
            teamName: 'Rock, Paper, Scissors, Lizard, Spock'
            // imageUrl: logo
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}
export default GameRoomChat;
