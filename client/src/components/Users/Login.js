import React, { Component } from 'react';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/securityActions';
// Make this a controlled component.
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  
  // Secures the Route.
  componentDidMount() {
    // If user is already logged in. Redirect him back to routes page.
    if (this.props.validToken) {
      this.props.history.push('/dashboard');
    }
  }

  // Handle Form Change
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle Form Submission
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = {
      username: email,
      password,
    }

    this.props.loginUser(credentials, this.props.history);
  }

  render() {
    const {  email, password} = this.state;
    const {errors} = this.props;
    const formGroup = "form-group";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <form action="create-profile.html" onSubmit={this.handleSubmit}>
                <div 
                  className={errors.username ? `error ${formGroup}` : `${formGroup}`} 
                >
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    required
                    onChange={this.handleChange}
                  />

                  <p>{errors.username}</p>
                </div>
                <div 
                  className={errors.password ? `error ${formGroup}` : `${formGroup}`} 
                >
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    required
                    onChange={this.handleChange}
                  />
                    <p>{errors.password}</p>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.formErrors,
  validToken: state.security.validToken
})

export default connect(mapStateToProps, {
  loginUser
})(Login)