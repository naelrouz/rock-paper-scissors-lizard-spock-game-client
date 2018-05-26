import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';

import events from '../../eventConstants';

import './GameRoomChat.css';

class GameRoomChat extends Component {
  constructor() {
    super();

    this.state = {
      messageList: []
    };
  }

  componentWillMount() {
    const { socket, gameRoomId } = this.props;

    // subscribe to a new chat messages
    socket.on(events.NEW_MESSAGE, async ({ text }) => {
      console.log('NEW_MESSAGE :', text);
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
    console.log('_onMessageWasSent.message', message);

    const {
      data: { text }
    } = message;

    if (text.length < 0) {
      return; // if the message is empty
    }

    const { socket, gameRoomId } = this.props;

    //  send message to the server
    socket.emit('m', { text, gameRoomId });

    console.log('mmmmmmmm');

    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  // _sendMessage(text) {
  //   console.log('_sendMessage');

  //   if (text.length < 0) {
  //     return; // if the message is empty
  //   }

  //   const { socket, gameRoomId } = this.props;

  //   //  send message to the server
  //   socket.emit(events.SEND_MESSAGE, { text, gameRoomId });

  //   this.setState({
  //     messageList: [
  //       ...this.state.messageList,
  //       {
  //         author: 'me',
  //         type: 'text',
  //         data: { text }
  //       }
  //     ]
  //   });
  // }

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
