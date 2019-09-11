import connect from '../redux/utils'
import ChooseTodosPanel from './ChooseTodosPanel'

function mapStateToProps(state) {
  return ({
    choosenUser: state.choosenUser,
    currentUser: state.currentUser,
    externalUsers: state.externalUsers,
  })
}

export default ChooseTodosPanel = connect(mapStateToProps)(ChooseTodosPanel)
