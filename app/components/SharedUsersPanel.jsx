// @flow
import React, { SyntheticKeyboardEvent } from 'react'
import SharedUser from './SharedUser'

type Props = {
  sharedUsers: Array<string>,
    addSharedUser: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    sharedUsersInputValue: string,
    updateSharedUsersFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
}

export default class SharedUsersPanel {
  constructor(props) {
    this.sharedUsers = props.sharedUsers
    this.sharedUsersInputValue = props.sharedUsersInputValue
  }

  render() {
    return (
      <div className="share-list-container">
        <input
          type="text"
          className="add-shared-user-input"
          onKeyPress={this.props.addSharedUser}
          placeholder="Add shared user"
          value={this.propssharedUsersInputValue}
          onChange={this.props.updateSharedUsersFieldValue}
        />
        <ul className="share-list">
          {this.sharedUsers.map((user) => <SharedUser user={user} key={user} />)}
        </ul>
      </div>
    )
  }
}

// SharedUsersPanel.defaultProps = {
//   sharedUsers: [],
//   sharedUsersInputValue: '',
// }

// SharedUsersPanel.propTypes = {
//   sharedUsers: PropTypes.arrayOf(PropTypes.string),
//   addSharedUser: PropTypes.func.isRequired,
//   updateSharedUsersFieldValue: PropTypes.func.isRequired,
//   sharedUsersInputValue: PropTypes.string,
// }
