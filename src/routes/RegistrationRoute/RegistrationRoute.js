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
    const jsx = (
      <section className="registration-container">
        <div className='tagline'>
          <p>Practice learning a language with the spaced repetition revision technique.</p>
        </div>
        <RegistrationForm
          toggleLoading={this.toggleLoading}
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );

    return this.state.loading ? <Loader /> : jsx;
  }
}

export default RegistrationRoute
