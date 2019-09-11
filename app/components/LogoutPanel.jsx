// @flow
import React from 'react'

type Props = {
  currentUser: string,
  logout: () => void,
}

export default class LogoutPanel {
  constructor(props) {
    this.currentUser = props.currentUser
  }

  render() {
    return (
      <div className="logout-section">
        <span className="current-user-span">{this.currentUser}</span>
        <button className="logout-button" type="button" onClick={this.props.logout}>Log Out</button>
        <hr />
        <button className="back-button" type="button" onClick={this.props.returnToTodosSelection}>Choose todos</button>
      </div>
    )
  }
}

// LogoutPanel.defaultProps = {
//   currentUser: '',
// }

// LogoutPanel.propTypes = {
//   currentUser: PropTypes.string,
//   logout: PropTypes.func.isRequired,
// }
