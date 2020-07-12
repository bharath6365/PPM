import React, { Component } from 'react';
import { EuiFlexItem, EuiFlexGroup, EuiButton } from '@elastic/eui';

export default class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <div className="banner-content">
          <h3>TaskComplete - A very simplistic Task Manager </h3>
          <EuiFlexGroup className="button-wrapper" gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton onClick={() => window.alert('Button clicked')}>Signup</EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton color="secondary" fill onClick={() => window.alert('Button clicked')}>
                Login
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </div>
    );
  }
}
