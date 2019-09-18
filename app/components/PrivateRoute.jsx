// @flow
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

import InjectedChooseTodosPanel from './ChooseTodosPanel'

type Props = {
  store: {
    isAuthenticated: Boolean,
  },
}

// @inject('store')
@observer
class PrivateRoute extends React.Component<Props> {
  render() {
    const { store: { isAuthenticated } } = this.props
    return (
      <Route
        render={() => (
          isAuthenticated ? (
            <InjectedChooseTodosPanel />
          ) : (
            <Redirect to="/login" />
          ))}
      />
    )
  }
}

const InjectedPrivateRoute = inject(({ store }) => ({ store }))(PrivateRoute)


export default InjectedPrivateRoute
