import connect from '../redux/utils'
import * as actions from '../redux/actions'
import LoginPanel from './LoginPanel'

function mapStateToProps(state) {
  return ({
    loginFieldValue: state.loginFieldValue,
    passwordFieldValue: state.passwordFieldValue,
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    login: () => dispatch(actions.login),
    updateLoginFieldValue: () => dispatch(actions.updateLoginFieldValue),
    updatePasswordFieldBalue: () => dispatch(actions.updatePasswordFieldBalue),
  })
}

export default LoginPanel = connect(mapStateToProps, mapDispatchToProps)(LoginPanel)
