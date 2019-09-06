// @flow
import React from 'react'
// import PropTypes from 'prop-types'

type Props = {
  currentUser: string,
  logout: () => void,
}

export default function LogoutPanel(props: Props) {
  const { currentUser, logout } = props
  return (
    <div className="logout-section">
      <span className="current-user-span">{currentUser}</span>
      <button className="logout-button" type="button" onClick={logout}>Log Out</button>
    </div>
  )
}

// LogoutPanel.defaultProps = {
//   currentUser: '',
// }

// LogoutPanel.propTypes = {
//   currentUser: PropTypes.string,
//   logout: PropTypes.func.isRequired,
// }
