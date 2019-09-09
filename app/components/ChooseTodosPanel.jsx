// @flow
import React, { SyntheticKeyboardEvent } from 'react'
import UserToChoose from './UserToChoose'
import TodosPage from './TodosPage'
import LogoutPanel from './LogoutPanel'
import BackToSelectionPanel from './BackToSelectionPanel'
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
  nextId: string,
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

export default function ChooseTodosPanel(props: Props) {
  const {
    currentUser,
    choosenUser,
    externalUsers,
    currentUpdatingTodo,
    addTodo,
    updateInputFieldValue,
    setViewModeAll,
    setViewModeActive,
    setViewModeCompleted,
    toggleReadyState,
    removeTodo,
    clearCompleted,
    todosInputValue,
    nextId,
    todos,
    todosToRender,
    currentViewMode,
    sharedUsers,
    sharedUsersInputValue,
    updateSharedUsersFieldValue,
    addSharedUser,
    logout,
    cancelUpdatingTodo,
    confirmUpdatingTodo,
    updateTodoInputFieldValue,
    updatingTodoInputValue,
    timeoutId,
    handleClicks,
    setChoosenUser,
    returnToTodosSelection,
  } = props
  console.log('choosenUser in panel', choosenUser)
  if (!choosenUser) {
    return (
      <>
      <LogoutPanel currentUser={currentUser} logout={logout} />
        <span>Choose Todos</span>
        <section className="choose-todos-panel">
          {['All', currentUser, ...externalUsers].map(
            (user) => (
              <UserToChoose
                user={user}
                currentUser={currentUser}
                setChoosenUser={setChoosenUser}
                key={user}
              />
            ),
          )}
        </section>
        <SharedUsersPanel
        sharedUsers={sharedUsers}
        sharedUsersInputValue={sharedUsersInputValue}
        updateSharedUsersFieldValue={updateSharedUsersFieldValue}
        addSharedUser={addSharedUser}
      />
      </>
    )
  }
  return (
    <TodosPage
      addTodo={addTodo}
      currentUpdatingTodo={currentUpdatingTodo}
      updateInputFieldValue={updateInputFieldValue}
      setViewModeAll={setViewModeAll}
      setViewModeActive={setViewModeActive}
      setViewModeCompleted={setViewModeCompleted}
      toggleReadyState={toggleReadyState}
      removeTodo={removeTodo}
      clearCompleted={clearCompleted}
      todosInputValue={todosInputValue}
      nextId={nextId}
      todos={todos}
      todosToRender={todosToRender}
      currentUser={currentUser}
      choosenUser={choosenUser}
      currentViewMode={currentViewMode}
      sharedUsers={sharedUsers}
      sharedUsersInputValue={sharedUsersInputValue}
      updateSharedUsersFieldValue={updateSharedUsersFieldValue}
      addSharedUser={addSharedUser}
      logout={logout}

      cancelUpdatingTodo={cancelUpdatingTodo}
      confirmUpdatingTodo={confirmUpdatingTodo}
      updateTodoInputFieldValue={updateTodoInputFieldValue}
      updatingTodoInputValue={updatingTodoInputValue}
      timeoutId={timeoutId}
      handleClicks={handleClicks}
      returnToTodosSelection={returnToTodosSelection}
    />
  )
}
