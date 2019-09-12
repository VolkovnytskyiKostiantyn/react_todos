// @flow
import React from 'react';

type Props = {
  user: string
};

export default function SharedUser(props: Props) {
  const { user } = props
  return <li>{user}</li>
}

// SharedUser.propTypes = {
//   user: PropTypes.string.isRequired,
// }
