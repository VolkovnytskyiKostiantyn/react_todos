import connect from '../redux/utils'
import UserToChoose from './UserToChoose'
import * as actions from '../redux/actions'

function mapStateToProps(state, ownProps) {
  return ({
    currentUser: state.currentUser,
    user: ownProps.user,
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    setChoosenUser: () => dispatch(actions.setChoosenUser),
  })
}

export default UserToChoose = connect(mapStateToProps, mapDispatchToProps)(UserToChoose)
