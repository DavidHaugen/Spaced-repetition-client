import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import './LoginForm.css'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = {
    error: null,
  }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target
    this.props.toggleLoading();
    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        console.log(res.error);
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
        <h2>Login</h2>

        <form
          className='LoginForm inputForm'
          onSubmit={this.handleSubmit}
        >
          <div role='alert' aria-live="polite" className="alert-danger">
            {error && <p>{error}</p>}
          </div>
          <div className="formField">
            <Label htmlFor='login-username-input' className="inputLabel">
              Username
            </Label>
            <Input
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              className="inputField"
              required
            />
          </div>
          <div className="formField">
            <Label htmlFor='login-password-input' className="inputLabel">
              Password
            </Label>
            <Input
              id='login-password-input'
              name='password'
              type='password'
              className="inputField"
              required
            />
          </div>
          <div className="flex center">
            <Button type='submit' className="btn btn-login">
              Login
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
