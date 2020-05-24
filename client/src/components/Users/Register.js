import React, { Component } from 'react';
import { connect } from 'react-redux';
import {registerUser} from '../../actions/securityActions';
// Make this a controlled component.
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
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
    const { name, email, password, confirmPassword } = this.state;
    const newUser = {
      fullName: name,
      username: email,
      password,
      confirmPassword
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { name, email, password, confirmPassword } = this.state;
    const {errors} = this.props;
    const formGroup = "form-group";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form action="create-profile.html" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
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

                  {errors.username && (
                    <p>Email already exists.</p>
                  )} 
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
                <div 
                  className={errors.confirmPassword ? `error ${formGroup}` : `${formGroup}`} 
                >
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    match="password"
                    onChange={this.handleChange}
                  />
                  <p>{errors.confirmPassword}</p> 
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
  errors: state.formErrors
})

export default connect(mapStateToProps, {
  registerUser
})(Register)