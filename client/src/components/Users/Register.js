import React, { Component } from 'react';
import { EuiFieldText, EuiForm, EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/securityActions';
import { checkFormErrors } from '../../utils';
// Make this a controlled component.
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      buttonLoading: false
    };
  }

  // Secures the Route.
  componentDidMount() {
    // If user is already logged in. Redirect him back to routes page.
    if (this.props.validToken) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    checkFormErrors(nextProps, () => {
      this.setState({
        buttonLoading: false
      })
    })
  }

  // Handle Form Change
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submission
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    const newUser = {
      fullName: name,
      username: email,
      password,
      confirmPassword
    };

    this.setState({
      buttonLoading: true
    })

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, confirmPassword, buttonLoading } = this.state;
    const { errors } = this.props;
    return (
      <div className="page-container">
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={4}>
            <h1 className="display-4">Sign Up</h1>
            <p className="lead">Free Forever</p>
          </EuiFlexItem>

          <EuiFlexItem
            grow={8}
            className={`form-container 
            ${Object.keys(errors).length > 0 ? 'error' : ''}
          `}
          >
            <EuiForm fullWidth onSubmit={this.handleSubmit}>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  autoFocus
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  value={name}
                  onChange={this.handleChange}                
                />
                <p>{errors.fullName}</p>
              </div>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  required
                  onChange={this.handleChange}
                />

                {errors.username && <p>Email already exists.</p>}
              </div>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required
                  onChange={this.handleChange}
                />
                <p>{errors.password}</p>
              </div>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  match="password"
                  onChange={this.handleChange}
                />
                <p>{errors.confirmPassword}</p>
              </div>
              <EuiButton isLoading={buttonLoading} fill color="primary" onClick={this.handleSubmit}>
                Create Account
              </EuiButton>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.formErrors,
  validToken: state.security.validToken
});

export default connect(mapStateToProps, {
  registerUser
})(Register);
