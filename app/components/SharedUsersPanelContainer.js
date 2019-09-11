import connect from '../redux/utils'
import * as actions from '../redux/actions'

function mapStateToProps(state) {
  return ({
    sharedUsers: state.sharedUsers,
    sharedUsersInputValue: state.sharedUsersInputValue,
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    addSharedUser: () => dispatch(actions.addSharedUser),
    updateSharedUsersFieldValue: () => dispatch(actions.updateSharedUsersFieldValue),
  })
}
