// @flow
import * as React from 'react'

// type Props = {
//   user: string
// };

type Props = {
  user: string,
}

class SharedUser extends React.PureComponent<Props> {
  render() {
    const { user } = this.props
    return (
      <li>{user}</li>
    )
  }
}

export default SharedUser
