// @flow
import React from 'react';

type Props = {
  currentUser: string,
  logout: () => void
};

export default function LogoutPanel(props: Props) {
  const { currentUser, logout, returnToTodosSelection } = props
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

// LogoutPanel.defaultProps = {
//   currentUser: '',
// }

// LogoutPanel.propTypes = {
//   currentUser: PropTypes.string,
//   logout: PropTypes.func.isRequired,
// }
