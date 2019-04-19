import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { Loader } from '../../components/Utils/Utils';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = {
    loading: false,
  }
  
  toggleLoading = () => {
    this.setState({loading: !this.state.loading})
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    let formClassname = 'registration-container';
    let loaderClassname = '';

    if(this.state.loading) formClassname += ' hidden';
    if(!this.state.loading) loaderClassname += ' hidden';

    return <>
      <Loader className={loaderClassname} />
      <section className={formClassname}>
        <div className='tagline'>
          <p>Practice learning a language with the spaced repetition revision technique.</p>
        </div>
        <RegistrationForm
          toggleLoading={this.toggleLoading}
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    </>;
  }
}

export default RegistrationRoute
