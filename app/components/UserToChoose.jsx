// @flow
import React, { PureComponent } from 'react'

type UserToChoosePropsType = {
    user: string,
    currentUser: string,
    setChoosenUser: () => void
}

export default class UserToChoose extends PureComponent<UserToChoosePropsType, State> {
  render() {
    const { user } = this.props
    return (
      <div className="user-to-choose" onClick={() => setChoosenUser(user)}>{this.user === this.currentUser ? 'Yours' : this.user}</div>
    )
  }
}
