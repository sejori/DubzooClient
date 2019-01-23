import React, { Component } from 'react';
import Social from './Social';
import StrapiAuth from './auth/StrapiAuth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userID: undefined,
        username: undefined,
        jwt: undefined
      }
    }
  }

  UpdateUser = (userID, username, jwt) => {
    let user = { userID, username, jwt };
    this.setState({ user: user });
  }

  render() {
    return (
      <div>

        <h1>DUBZOO</h1>
        <StrapiAuth UpdateUser={this.UpdateUser} user={this.state.user}/>

        <ul className="socials">
          <li><Social user={this.state.user} target="YouTube"/></li>
        </ul>

      </div>
    );
  }
}

export default App;
