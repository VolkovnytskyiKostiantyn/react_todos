import connect from '../redux/utils'
import PrivateRoute from './PrivateRoute'

function mapStateToProps(state) {
  return ({
    isAuthenticated: state.isAuthenticated,
  })
}

export default PrivateRoute = connect(mapStateToProps)(PrivateRoute)
