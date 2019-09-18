// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

type Props = {
  store: {
    currentUser: string,
    logout: () => void,
    returnToTodosSelection: () => void
  },
};

// @inject('store')
@observer
class LogoutPanel extends React.Component<Props> {
  render() {
    const { store: { currentUser, logout, returnToTodosSelection } } = this.props
    return (
      <div className="logout-section">
        <span className="current-user-span">{currentUser}</span>
        <button className="logout-button" type="button" onClick={logout}>
          Log Out
        </button>
        <hr />
        <button
          className="back-button"
          type="button"
          onClick={returnToTodosSelection}
        >
          Choose todos
        </button>
      </div>
    )
  }
}

const InjectedLogoutPanel = inject(({ store }) => ({ store }))(LogoutPanel)


export default InjectedLogoutPanel
