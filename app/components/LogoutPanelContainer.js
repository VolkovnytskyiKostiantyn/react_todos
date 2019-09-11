import connect from '../redux/utils'
import LogoutPanel from './LogoutPanel'
import * as actions from '../redux/actions'

function mapStateToProps(state) {
  return ({
    currentUser: state.currentUser,
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    logout: () => dispatch(actions.logout),
    returnToTodosSelection: () => dispatch(actions.returnToTodosSelection),
  })
}

export default LogoutPanel = connect(mapStateToProps, mapDispatchToProps)(LogoutPanel)
