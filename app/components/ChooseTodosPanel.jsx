// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

import InjectedUserToChoose from './UserToChoose'
import TodosPage from './TodosPage'
import InjectedLogoutPanel from './LogoutPanel'
import InjectedSharedUsersPanel from './SharedUsersPanel'

type Props = {
  store: {
    currentUser: string,
    choosenUser: string,
    externalUsers: Array<string>,
  },
};

// @inject('store')
@observer
class ChooseTodosPanel extends React.Component<Props> {
  render() {
    const { store: { choosenUser, currentUser, externalUsers } } = this.props
    if (!choosenUser) {
      return (
        <>
          <InjectedLogoutPanel />
          <span>Choose Todos</span>
          <section className="choose-todos-panel">
            {['All', currentUser, ...externalUsers].map((item) => (
              <InjectedUserToChoose user={item} key={item} />
            ))}
          </section>
          <InjectedSharedUsersPanel />
        </>
      )
    }
    return (
      <TodosPage />
    )
  }
}

const InjectedChooseTodosPanel = inject(({ store }) => ({ store }))(ChooseTodosPanel)


export default InjectedChooseTodosPanel
