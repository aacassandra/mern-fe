import { NasaBG } from '../../assets';
import './register.scss';
import { Inputfield, Button, Gap, Link } from '../../components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Index extends Component {
  state = {
    isProgress: false,
    form: {
      name: '',
      email: '',
      passwor: ''
    }
  };

  formOnChange = (e) => {
    let form = { ...this.state.form };
    form[e.target.name] = e.target.value;
    this.setState({
      form: form
    });
  };

  onSignup = (e) => {
    e.preventDefault();
    if (!this.state.form.name || !this.state.form.email || !this.state.form.password) {
      alert('All field is required');
      return false;
    }

    this.setState({
      isProgress: true
    });
    axios
      .post(process.env.REACT_APP_API_SIGNUP, this.state.form)
      .then((res) => {
        this.setState({
          isProgress: false
        });
        alert(res.data.message);
      })
      .catch((err) => {
        this.setState({
          isProgress: false
        });
        alert(err.response.data.message);
      });
  };

  render() {
    return (
      <div className="main-page">
        <div className="left">{<img src={NasaBG} alt="" className="bg-image" />}</div>
        <div className="right bg-white">
          <p className="title">Register</p>
          <Gap height={18} />
          <form onSubmit={this.onSignup}>
            <div className="input-wrapper">
              <p className="label">Full Name</p>
              <Inputfield
                type="text"
                name="name"
                className="input"
                placeholder="Full Name"
                onChange={this.formOnChange}
              />
            </div>
            <Gap height={18} />
            <div className="input-wrapper">
              <p className="label">Email</p>
              <Inputfield
                type="email"
                name="email"
                placeholder="Email"
                className="input"
                onChange={this.formOnChange}
              />
            </div>
            <Gap height={18} />

            <div className="input-wrapper">
              <p className="label">Password</p>
              <Inputfield
                type="password"
                name="password"
                placeholder="Password"
                className="input"
                onChange={this.formOnChange}
              />
            </div>
            <Gap height={18} />
            <Gap height={20} />
            <Button title="Register" type="submit" disabled={this.state.isProgress}>
              {this.state.isProgress ? (
                <Button.Slot>
                  Please wait... <i className="fas fa-spin fa-spinner"></i>
                </Button.Slot>
              ) : (
                <Button.Slot>Signup</Button.Slot>
              )}
            </Button>
            <Gap height={10} />
            <Link title="Kembali ke login" onClick={() => this.props.history.push('/signin')} />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
