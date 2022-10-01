import { NasaBG } from '../../assets';
import { Inputfield, Button, Gap, Link } from '../../components';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Index extends Component {
  state = {
    isProgress: false,
    form: {
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
    if (!this.state.form.email || !this.state.form.password) {
      alert('All field is required');
      return false;
    }

    this.setState({
      isProgress: true
    });
    axios
      .post(process.env.REACT_APP_API_SIGNIN, this.state.form)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        this.setState({
          isProgress: false
        });
        this.props.history.push('/');
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
          <p className="title">Login</p>
          <Gap height={18} />
          <form onSubmit={this.onSignup}>
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
                <Button.Slot>Signin</Button.Slot>
              )}
            </Button>
            <Gap height={10} />
            <Link
              title="Tidak punya akun? daftar."
              onClick={() => this.props.history.push('/signup')}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
