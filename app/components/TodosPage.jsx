// @flow
import React, { SyntheticKeyboardEvent } from 'react'

import LogoutPanel from './LogoutPanel'
import TodoList from './TodoList'
import SharedUsersPanel from './SharedUsersPanel'

type Props = {
  addTodo: (event: SyntheticKeyboardEvent<HTMLButtonElement>) => void,
  currentUpdatingTodo: string,
  updateInputFieldValue: (
    event: SyntheticKeyboardEvent<HTMLInputElement>
  ) => void,
  setViewModeAll: () => void,
  setViewModeActive: () => void,
  setViewModeCompleted: () => void,
  toggleReadyState: () => void,
  removeTodo: (idToDelete: string) => void,
  clearCompleted: () => void,
  todosInputValue: string,
  todos: Array<{
    title: string,
    _id: string,
    owner: string,
    isCompleted: boolean | string
  }>,
  todosToRender: Array<{
    title: string,
    _id: string,
    owner: string,
    isCompleted: boolean | string
  }>,
  currentUser: string,
  choosenUser: string,
  currentViewMode: "All" | "Active" | "Completed",
  sharedUsers: Array<string>,
  sharedUsersInputValue: string,
  updateSharedUsersFieldValue: (
    event: SyntheticKeyboardEvent<HTMLInputElement>
  ) => void,
  addSharedUser: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  logout: () => void,
  cancelUpdatingTodo: () => void,
  beginUpdatingTodo: () => void,
  confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
  updateTodoInputFieldValue: (
    event: SyntheticKeyboardEvent<HTMLInputElement>
  ) => void,
  updatingTodoInputValue: string,
  timeoutId: TimeoutID,
  handleClicks: (id: string, todoTitle: string) => void
};

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
    todos,
    todosToRender,
    currentUser,
    choosenUser,
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
    returnToTodosSelection,
  } = props
  return (
    <>
      <LogoutPanel
        currentUser={currentUser}
        logout={logout}
        returnToTodosSelection={returnToTodosSelection}
      />
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
        todos={todos}
        todosToRender={todosToRender}
        currentUser={currentUser}
        choosenUser={choosenUser}
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
