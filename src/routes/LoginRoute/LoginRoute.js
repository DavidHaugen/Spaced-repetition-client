import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Loader } from '../../components/Utils/Utils';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  state = {
    loading: false,
  }

  toggleLoading = () => {
    this.setState({loading: !this.state.loading})
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    const jsx = (
      <section className="login-container">
        <LoginForm
          toggleLoading={this.toggleLoading}
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );

    return this.state.loading ? <Loader /> : jsx;
  }
}

export default LoginRoute
