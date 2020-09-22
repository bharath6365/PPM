import React, { Component } from 'react';
import {
  EuiFieldText,
  EuiForm,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/securityActions';
import { checkFormErrors } from '../../utils';
// Make this a controlled component.
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;
    const credentials = {
      username: email,
      password
    };
    this.setState({
      buttonLoading: true
    })

    this.props.loginUser(credentials, this.props.history);
  };

  render() {
    const { email, password, buttonLoading } = this.state;
    const { errors } = this.props;
    return (
      <div className="page-container">
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={4}>
            <h1 className="display-4 text-center">Login</h1>
          </EuiFlexItem>

          <EuiFlexItem grow={8} 
          className={`form-container 
            ${Object.keys(errors).length > 0 ? 'error' : ''}
          `}>
            <EuiForm fullWidth onSubmit={this.handleSubmit}>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  autoFocus
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  required
                  onChange={this.handleChange}
                  aria-label="Email Address"
                />

                <p>{errors.username}</p>
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
              <EuiButton isLoading = {buttonLoading} color="primary" onClick={this.handleSubmit}>
                Submit
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
  loginUser
})(Login);
