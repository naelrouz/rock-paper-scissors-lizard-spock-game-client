import React, { Component } from 'react';

import events from '../../eventConstants';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }
  componentWillMount() {}

  // updates form inputs
  handleChange(event) {
    this.setState({ nickname: event.target.value });
  }

  // Sends emit to socket for update username
  handleSubmit(event) {
    event.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(events.CHANGE_USERNAME, nickname, this.setUser);
  }

  render() {
    const { username } = this.state;
    return (
      <div className="login">
        <form className="login__form" onSubmit={this.handleSubmit}>
          <label htmlFor="nickname">
            <h1 style={{ textAlign: 'center' }}>Got a nickname?</h1>
          </label>

          <input
            ref={input => {
              this.textInput = input;
            }}
            id="username"
            type="text"
            value={username}
            onChange={this.handleChange}
            placeholder={'Please introduce yourself'}
          />
        </form>
      </div>
    );
  }
}

export default LoginForm;
