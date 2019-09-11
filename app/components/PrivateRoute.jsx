import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ChooseTodosPanel from './ChooseTodosPanel'

export default class PrivateRoute extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isAuthenticated = props.isAuthenticated
  }

  render() {
    return (
      <Route
        render={() => (
          this.isAuthenticated
            ? (
              <ChooseTodosPanel />
            )
            : <Redirect to="/login" />
        )}
      />
    )
  }
}
