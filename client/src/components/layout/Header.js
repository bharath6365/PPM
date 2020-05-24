import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logoutUser} from '../../actions/securityActions';
class Header extends Component {
  // Handle Logout
  handleLogout = () => {
    this.props.logoutUser();
    // TODO: Change this to react router config.
    window.location.href = '/login';
  }
  render() {
    const { user } = this.props;
    const isUserAvailable = Object.keys(user).length > 0 ? true : false;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="Dashboard.html">
            Personal Project Management Tool
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isUserAvailable && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>

                <li style={{cursor: 'pointer'}} className="nav-item" onClick={this.handleLogout}>
                  <span className="nav-link">Logout</span>
                </li>
              </ul>
            )}

            {!isUserAvailable && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.security.user
});
export default connect(mapStateToProps, {
  logoutUser
})(Header);
