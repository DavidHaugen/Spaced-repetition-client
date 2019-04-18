import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.toggleLoading(); // set loading to true
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.props.toggleLoading();
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <div className="formContainer">
        <h2>Sign up</h2>

        <form className="inputForm"
          onSubmit={this.handleSubmit}
        >
          <div role='alert' aria-live="polite">
            {error && <p>{error}</p>}
          </div>
          <div className="formField">
            <Label htmlFor='registration-name-input' className="inputLabel">
              Enter your name<Required />
            </Label>
            <Input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              className="inputField"
              required
            />
          </div>
          <div className="formField">
            <Label htmlFor='registration-username-input' className="inputLabel">
              Choose a username<Required />
            </Label>
            <Input
              id='registration-username-input'
              name='username'
              className="inputField"
              required
            />
          </div>
          <div className="formField">
            <Label htmlFor='registration-password-input' className="inputLabel">
              Choose a password<Required />
            </Label>
            <Input
              id='registration-password-input'
              name='password'
              type='password'
              className="inputField"
              required
            />
          </div>
          <footer>
            <Button type='submit' className="btn btn-register">
              Sign up
            </Button>

            <Link to='/login' className="alreadyAccountLink" >Already have an account?</Link>
          </footer>
        </form>
      </div>
    )
  }
}

export default RegistrationForm
