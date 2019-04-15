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
        <h2>Create a new account</h2>

        <form className="inputForm"
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <div className="formField">
            <Label htmlFor='registration-name-input' className="inputLabel">
              Name<Required />
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
              Username<Required />
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
              Password<Required />
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
            <div className="flex right">
              <Button type='submit' className="textButton signUp">
                Sign up
              </Button>
            </div>
            {' '}
            <div className="alreadyAccountLink" >
              <Link to='/login' className="alreadyAccountLink" >Already have an account?</Link>
            </div>
          </footer>
        </form>
      </div>
    )
  }
}

export default RegistrationForm
