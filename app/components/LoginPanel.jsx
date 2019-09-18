// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

type Props = {
  store: {
    login: (
      event: | SyntheticKeyboardEvent<HTMLInputElement>
        | SyntheticMouseEvent<HTMLButtonElement>
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
};

// @inject('store')
@observer
class LoginPanel extends React.Component<Props> {
  render() {
    const {
      store: {
        login, loginFieldValue, passwordFieldValue, updateLoginFieldValue, updatePasswordFieldValue,
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
              onKeyDown={login}
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
              onKeyDown={login}
            />
          </label>
        </div>
        <button type="button" className="login-button" onClick={login}>
        Login
        </button>
        <Link className="sign-up-link" to="/signUp">Sign Up</Link>
      </section>
    )
  }
}

const InjectedLoginPanel = inject(({ store }) => ({ store }))(LoginPanel)


export default InjectedLoginPanel
