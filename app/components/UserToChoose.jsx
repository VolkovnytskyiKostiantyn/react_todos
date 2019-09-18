// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

type Props = {
  user: string,
  store: {
    currentUser: string,
    setChoosenUser: (username: string) => void
  }
};

// @inject('store')
@observer
class UserToChoose extends React.Component<Props> {
  render() {
    const { store: { setChoosenUser, currentUser }, user } = this.props
    return (
      <div
        className="user-to-choose"
        onClick={() => setChoosenUser(user)}
      >
        {user === currentUser ? 'Yours' : user}
      </div>
    )
  }
}

const InjectedUserToChoose = inject(({ store }) => ({ store }))(UserToChoose)

export default InjectedUserToChoose
