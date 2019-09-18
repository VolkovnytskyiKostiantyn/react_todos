// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

import SharedUser from './SharedUser'

type Props = {
  store: {
    sharedUsers: Array<string>,
    addSharedUser: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    sharedUsersInputValue: string,
    updateSharedUsersFieldValue: (
      event: SyntheticKeyboardEvent<HTMLInputElement>
    ) => void
  },
};


// @inject('store')
@observer
class SharedUsersPanel extends React.Component<Props> {
  render() {
    const {
      store: {
        addSharedUser, sharedUsersInputValue, updateSharedUsersFieldValue, sharedUsers,
      },
    } = this.props
    return (
      <div className="share-list-container">
        <input
          type="text"
          className="add-shared-user-input"
          onKeyPress={addSharedUser}
          placeholder="Add shared user"
          value={sharedUsersInputValue}
          onChange={updateSharedUsersFieldValue}
        />
        <ul className="share-list">
          {sharedUsers.map((user) => (
            <SharedUser user={user} key={user} />
          ))}
        </ul>
      </div>
    )
  }
}

const InjectedSharedUsersPanel = inject(({ store }) => ({ store }))(SharedUsersPanel)


export default InjectedSharedUsersPanel
