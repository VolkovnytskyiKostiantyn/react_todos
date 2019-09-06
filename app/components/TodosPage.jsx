// @flow
import React from 'react'
// import PropTypes from 'prop-types'

import LogoutPanel from './LogoutPanel'
import TodoList from './TodoList'
import SharedUsersPanel from './SharedUsersPanel'

type Props = {
  addTodo: (event: SyntheticKeyboardEvent<HTMLButtonElement>) => void,
  currentUpdatingTodo: string,
  updateInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  setViewModeAll: () => void,
  setViewModeActive: () => void,
  setViewModeCompleted: () => void,
  toggleReadyState: () => void,
  removeTodo: (idToDelete: string) => void,
  clearCompleted: () => void,
  todosInputValue: string,
  nextId: number,
  todos: Array<{
    title: string,
    _id: string,
    owner: string,
    isCompleted: boolean | string,
  }>,
  todosToRender: Array<{
    title: string,
    _id: string,
    owner: string,
    isCompleted: boolean | string,
  }>,
  currentUser: string,
  currentViewMode: "All" | "Active" | "Completed",
  sharedUsers: Array<string>,
  sharedUsersInputValue: string,
  updateSharedUsersFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  addSharedUser: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  logout: () => void,
  cancelUpdatingTodo: () => void,
  beginUpdatingTodo: () => void,
  confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
  updateTodoInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  updatingTodoInputValue: string,
  timeoutId: TimeoutID,
  handleClicks: (id: string, todoTitle: string) => void,
}

export default function TodosPage(props: Props) {
  const {
    addTodo,
    currentUpdatingTodo,
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
    currentUser,
    currentViewMode,
    sharedUsers,
    sharedUsersInputValue,
    updateSharedUsersFieldValue,
    addSharedUser,
    logout,
    cancelUpdatingTodo,
    beginUpdatingTodo,
    confirmUpdatingTodo,
    updateTodoInputFieldValue,
    updatingTodoInputValue,
    timeoutId,
    handleClicks,
  } = props
  return (
    <>
      <LogoutPanel currentUser={currentUser} logout={logout} />
      <TodoList
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
        currentViewMode={currentViewMode}
        cancelUpdatingTodo={cancelUpdatingTodo}
        beginUpdatingTodo={beginUpdatingTodo}
        confirmUpdatingTodo={confirmUpdatingTodo}
        updateTodoInputFieldValue={updateTodoInputFieldValue}
        updatingTodoInputValue={updatingTodoInputValue}
        timeoutId={timeoutId}
        handleClicks={handleClicks}
      />
      <SharedUsersPanel
        sharedUsers={sharedUsers}
        sharedUsersInputValue={sharedUsersInputValue}
        updateSharedUsersFieldValue={updateSharedUsersFieldValue}
        addSharedUser={addSharedUser}
      />
    </>
  )
}

// TodosPage.defaultProps = {
//   currentUser: '',
//   todos: [],
//   todosInputValue: '',
//   sharedUsers: [],
//   sharedUsersInputValue: '',
// }

// TodosPage.propTypes = {
//   currentUser: PropTypes.string,
//   logout: PropTypes.func.isRequired,
//   todos: PropTypes.arrayOf(PropTypes.object),
//   addTodo: PropTypes.func.isRequired,
//   todosInputValue: PropTypes.string,
//   updateInputFieldValue: PropTypes.func.isRequired,
//   setViewModeAll: PropTypes.func.isRequired,
//   setViewModeActive: PropTypes.func.isRequired,
//   setViewModeCompleted: PropTypes.func.isRequired,
//   toggleReadyState: PropTypes.func.isRequired,
//   removeTodo: PropTypes.func.isRequired,
//   clearCompleted: PropTypes.func.isRequired,
//   sharedUsers: PropTypes.arrayOf(PropTypes.string),
//   addSharedUser: PropTypes.func.isRequired,
//   updateSharedUsersFieldValue: PropTypes.func.isRequired,
//   sharedUsersInputValue: PropTypes.string,
//   nextId: PropTypes.number.isRequired,
// }
