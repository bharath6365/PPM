import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/securityActions';
import { EuiHeader, EuiHeaderSectionItem, EuiHeaderLogo, EuiHeaderLinks, EuiHeaderLink } from '@elastic/eui';
import Logo from '../../images/logo.png';
class Header extends Component {
  // Handle Logout
  handleLogout = () => {
    this.props.logoutUser();
    // TODO: Change this to react router config.
    window.location.href = '/login';
  };
  render() {
    const { user } = this.props;
    const isUserAvailable = Object.keys(user).length > 0 ? true : false;
    return (
      <EuiHeader>
        <Link to="/dashboard">
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLogo href="#">TaskComplete</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </Link>
        

        <EuiHeaderSectionItem>
          <EuiHeaderLinks aria-label="Dashboard">
            {isUserAvailable && (
              <Fragment>
                <Link to="/dashboard">
                  <EuiHeaderLink>Dashboard</EuiHeaderLink>
                </Link>

                <EuiHeaderLink onClick={this.handleLogout}>Logout</EuiHeaderLink>
              </Fragment>
            )}

            {!isUserAvailable && (
              <Fragment>
                <Link to="/register">
                  <EuiHeaderLink>Signup</EuiHeaderLink>
                </Link>

                <Link to="/login">
                  <EuiHeaderLink>Login</EuiHeaderLink>
                </Link>
              </Fragment>
            )}
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeader>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.security.user
});
export default connect(mapStateToProps, {
  logoutUser
})(Header);
