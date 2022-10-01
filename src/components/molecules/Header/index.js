/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import './header.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Index extends Component {
  state = {
    isProgress: false,
    user: {
      name: ''
    }
  };

  componentDidMount() {
    let storage = localStorage.getItem('user');
    if (storage) {
      storage = JSON.parse(storage);
      let user = { ...this.state.user };
      user.name = storage.name;

      this.setState({
        user: user
      });
    }
  }

  signoutConfirm = () => {
    let text = 'You want to signout?';
    if (confirm(text) === true) {
      const { token } = JSON.parse(localStorage.getItem('user'));
      this.setState({
        isProgress: true
      });
      axios
        .get(process.env.REACT_APP_API_SIGNOUT, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          this.setState({
            isProgress: false
          });
          localStorage.removeItem('user');
          this.props.history.push('/signin');
        });
    }
  };

  render() {
    return (
      <div className="header">
        <p className="logo-app">MERN</p>
        <div className="menu-item">
          <div className="mr-10">{this.state.user.name}</div>
          <div onClick={() => this.signoutConfirm()} className="underline cursor-pointer">
            {this.state.isProgress ? (
              <div>
                Please wait <i className="fas fa-spin fa-spinner"></i>
              </div>
            ) : (
              <div>Signout</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
