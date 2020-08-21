import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class LoggedInHOC extends Component {
  render() {
    // Get the component to render from the props. Check App.jest
    const { validToken, history, children } = this.props;

    if (validToken) {
      return (
        <>
          {children}
        </>
      );
    } else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  validToken: state.security.validToken
});

export default connect(mapStateToProps, {})(LoggedInHOC);