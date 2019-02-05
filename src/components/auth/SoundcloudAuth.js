import React, { Component } from 'react';

const keys = require('../../config/keys');

var accountId;

class SoundcloudAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistInput: "",
      authorised: false
    }
  }

  Authorise = () => {
    this.setState({ authorised: !this.state.authorised })
  }

  componentDidMount = () => {
    this.checkCredentials();
  }

  checkCredentials = async() => {
    // Retrieve credentials from database
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();

    if (json.soundcloudaccount !== undefined) {
      this.Authorise();
      accountId = json.soundcloudaccount._id;
    }
  }

  Login = async() => {

    let channelName = this.state.artistInput;
    let user = this.props.user.userID;

    // Store retrieved credentials in database
    await fetch(keys.STRAPI_URI + '/soundcloudaccounts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
      body: JSON.stringify({
        "channelName": channelName,
        "user": user
      })
    })

    this.Authorise();
  }

  Logout = () => {
    // Retrieve credentials from database
    fetch(keys.STRAPI_URI + '/youtubeaccounts/' + accountId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    this.Authorise();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    switch (this.state.authorised) {
      case false:
        return(
          <div className="SoundcloudAuth">
            <input
              name="artistInput"
              type="text"
              placeholder="Soundcloud Username"
              value={this.state.artistInput}
              onChange={this.handleChange}
            />
            <button onClick={this.Login}>Login</button>
          </div>
        )
      default:
        return(
          <div>
            <button onClick={this.Logout}>Logout</button>
          </div>
        )
    }
  }
}

export default SoundcloudAuth;
