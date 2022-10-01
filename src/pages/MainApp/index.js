import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../Home';
import { Footer, Header } from '../../components';
import './mainapp.scss';

class Index extends Component {
  componentDidMount() {
    const storage = localStorage.getItem('user');
    if (!storage) {
      this.props.history.push('/signin');
    }
  }

  render() {
    return (
      <div className="main-app-wrapper">
        <Header />
        <div className="content-wrapper">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Index);
