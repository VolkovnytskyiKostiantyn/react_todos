// @flow
import React, { SyntheticKeyboardEvent } from 'react'
import UserToChoose from './UserToChoose'
import TodosPage from './TodosPage'
import LogoutPanel from './LogoutPanel'
import SharedUsersPanel from './SharedUsersPanel'

type Props = {
    currentUser: string,
    choosenUser: string,
    externalUsers: Array<string>,
  currentUpdatingTodo: string,
  addTodo: () => void,
  updateInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  setViewModeAll: () => void,
  setViewModeActive: () => void,
  setViewModeCompleted: () => void,
  toggleReadyState: () => void,
  removeTodo: (idToDelete: string) => void,
  clearCompleted: () => void,
  todosInputValue: string,
  nextId: number,
  todos: Array<object>,
  todosToRender: Array<object>,
  currentViewMode: string,
  sharedUsers: Array<string>,
  sharedUsersInputValue: string,
  updateSharedUsersFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  addSharedUser: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  logout: () => void,
  cancelUpdatingTodo: () => void,
  confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
  updateTodoInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  updatingTodoInputValue: string,
  timeoutId: TimeoutID,
  handleClicks: (id: string, todoTitle: string) => void,
  setChoosenUser: () => void,
}

export default class ChooseTodosPanel {
  constructor(props) {
    this.choosenUser = props.choosenUser
    this.currentUser = props.currentUser
    this.externalUsers = props.externalUsers
  }

  render() {
    if (!this.choosenUser) {
      return (
        <>
          <LogoutPanel />
          <span>Choose Todos</span>
          <section className="choose-todos-panel">
            {['All', this.currentUser, ...this.externalUsers].map(
              (user) => (
                <UserToChoose
                  user={user}
                  key={user}
                />
              ),
            )}
          </section>
          <SharedUsersPanel />
        </>
      )
    }
    return (
      <TodosPage />
    )
  }
}
