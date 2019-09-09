// @flow
import React from 'react'

type Props = {
    user: string,
    currentUser: string,
    setChoosenUser: () => void
}

export default function UserToChoose(props: Props) {
  const { user, currentUser, setChoosenUser } = props
  return (
    <div className="user-to-choose" onClick={() => setChoosenUser(user)}>{user === currentUser ? 'Yours' : user}</div>
  )
}
