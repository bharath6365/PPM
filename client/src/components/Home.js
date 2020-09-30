import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { EuiFlexItem, EuiFlexGroup, EuiButton } from '@elastic/eui';

class Home extends Component {
  render() {
    const {user, history} = this.props;
    if (user.id) {
      // Redirect to dashboard.
      history.push('/dashboard');
    }
    return (
      <div className="home-wrapper">
        <div className="banner-content">
          <h3>TaskComplete - A very simplistic Task Manager </h3>
          <EuiFlexGroup className="button-wrapper" gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <Link to="/register">
                <EuiButton>Signup</EuiButton>
              </Link>         
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <Link to="/login">
                <EuiButton color="secondary" fill>
                Login
              </EuiButton>
              </Link>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.security.user
})

export default connect(mapStateToProps)(Home);