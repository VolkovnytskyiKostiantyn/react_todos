// @flow
import React from 'react'
// import PropTypes from 'prop-types'

type Props = {
  user: string,
}

export default function SharedUser(props: Props) {
  const { user } = props
  return (
    <li>{user}</li>
  )
}

// SharedUser.propTypes = {
//   user: PropTypes.string.isRequired,
// }
