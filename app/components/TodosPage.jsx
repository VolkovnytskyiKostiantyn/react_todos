// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
// import { inject } from 'mobx-react'

import InjectedLogoutPanel from './LogoutPanel'
import InjectedTodoList from './TodoList'
import InjectedSharedUsersPanel from './SharedUsersPanel'

type Props = {}

@observer
class TodosPage extends React.PureComponent<Props> {
  render() {
    return (
      <>
        <InjectedLogoutPanel />
        <InjectedTodoList />
        <InjectedSharedUsersPanel />
      </>
    )
  }
}

export default TodosPage
