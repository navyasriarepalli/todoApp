import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    console.log('success')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="name">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="input-see"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    return (
      <>
        <label htmlFor="password" className="name">
          Password*
        </label>
        <input
          type={inputType}
          id="password"
          className="input-see"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />

        <div className="checkbox-cont">
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.onShowPassword}
            className="checkbox"
          />
          <label htmlFor="checkbox" className="checkbox-label">
            Show Password
          </label>
        </div>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-cont">
        <form className="form-cont" onSubmit={this.onSubmitForm}>
                <div>{this.renderUsernameField()}</div>
                <div>{this.renderPasswordField()}</div>
                {showSubmitError && <p className="red">{errorMsg}</p>}
                <button type="submit" className="login-button">
                  Register
                </button>
        </form>
        
      </div>
    )
  }
}

export default Login