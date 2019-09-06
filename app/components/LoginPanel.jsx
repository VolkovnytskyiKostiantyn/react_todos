// @flow
import React from 'react'
// import PropTypes from 'prop-types'

type Props = {
  login: (event: SyntheticKeyboardEvent<HTMLInputElement> | SyntheticMouseEvent<HTMLButtonElement>) => void,
  loginFieldValue: string,
  passwordFieldValue: string,
  updateLoginFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  updatePasswordFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
}

export default function LoginPanel(props: Props) {
  const {
    login,
    loginFieldValue,
    passwordFieldValue,
    updateLoginFieldValue,
    updatePasswordFieldValue,
  } = props
  console.log('login panel')
  return (
    <section className="login-form-container">
      <div className="inputs-container">
        <label htmlFor="login-field">
        Login:
          <input className="login-field" id="login-field" type="text" value={loginFieldValue} onChange={updateLoginFieldValue} onKeyDown={login} />
        </label>
        <label htmlFor="password-field">
          Password:
          <input className="password-field" id="password-field" type="password" value={passwordFieldValue} onChange={updatePasswordFieldValue} onKeyDown={login} />
        </label>
      </div>
      <button type="button" className="login-button" onClick={login}>Submit</button>
    </section>
  )
}

// LoginPanel.propTypes = {
//   login: PropTypes.func.isRequired,
// }
