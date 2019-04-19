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
    let formClassname = 'login-container';
    let loaderClassname = '';

    if(this.state.loading) formClassname += ' hidden';
    if(!this.state.loading) loaderClassname += ' hidden';

    return <>
      <Loader className={loaderClassname} />
      <section className={formClassname}>
        <LoginForm
          toggleLoading={this.toggleLoading}
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    </>;
  }
}

export default LoginRoute
