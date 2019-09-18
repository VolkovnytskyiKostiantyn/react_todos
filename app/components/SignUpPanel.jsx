// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

type Props = {
  store: {
    signUp: (
      event: SyntheticKeyboardEvent<HTMLInputElement>
        | SyntheticMouseEvent<HTMLButtonElement>,
    ) => void,
    loginFieldValue: string,
    passwordFieldValue: string,
    updateLoginFieldValue: (
      event: SyntheticKeyboardEvent<HTMLInputElement>
    ) => void,
    updatePasswordFieldValue: (
      event: SyntheticKeyboardEvent<HTMLInputElement>
    ) => void
  },
}


@observer
class SignUpPanel extends React.Component<Props> {
  render() {
    const {
      store: {
        signUp, loginFieldValue, passwordFieldValue, updateLoginFieldValue, updatePasswordFieldValue,
      },
    } = this.props
    return (
      <section className="login-form-container">
        <div className="inputs-container">
          <label htmlFor="login-field">
          Login:
            <input
              className="login-field"
              id="login-field"
              type="text"
              value={loginFieldValue}
              onChange={updateLoginFieldValue}
              onKeyDown={signUp}
            />
          </label>
          <label htmlFor="password-field">
          Password:
            <input
              className="password-field"
              id="password-field"
              type="password"
              value={passwordFieldValue}
              onChange={updatePasswordFieldValue}
              onKeyDown={signUp}
            />
          </label>
        </div>
        <button type="button" className="login-button" onClick={signUp}>
        Sign Up
        </button>
        <Link className="sign-up-link" to="/login">Log In</Link>
      </section>
    )
  }
}

const InjectedSignUpPanel = inject(({ store }) => ({ store }))(SignUpPanel)


export default InjectedSignUpPanel
