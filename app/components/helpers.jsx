// @flow
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import PropTypes from 'prop-types'

import TodosPage from './TodosPage'


export default async function callApi(type: string, customBody: ?{} = {}, additionalPath: string = '/') :Object {
  let response
  const token = localStorage.getItem('token')
  if (type === 'GET' || type === 'HEAD') {
    response = await fetch(`http://localhost:9999${additionalPath}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${token || 'no token'}`,
      },
    })
  } else {
    response = await fetch(`http://localhost:9999${additionalPath}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${token || 'no token'}`,
      },
      body: JSON.stringify(customBody),
    })
  }
  return response
}

export const PrivateRoute = ({
  isAuthenticated,
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
} :Object) => (
  <Route
    render={() => (
      isAuthenticated
        ? (
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
            currentViewMode={currentViewMode}
            sharedUsers={sharedUsers}
            sharedUsersInputValue={sharedUsersInputValue}
            updateSharedUsersFieldValue={updateSharedUsersFieldValue}
            addSharedUser={addSharedUser}
            logout={logout}

            cancelUpdatingTodo={cancelUpdatingTodo}
            beginUpdatingTodo={beginUpdatingTodo}
            confirmUpdatingTodo={confirmUpdatingTodo}
            updateTodoInputFieldValue={updateTodoInputFieldValue}
            updatingTodoInputValue={updatingTodoInputValue}
            timeoutId={timeoutId}
            handleClicks={handleClicks}
          />
        )
        : <Redirect to="/login" />
    )}
  />
)

// PrivateRoute.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,

//   cancelUpdatingTodo: PropTypes.func.isRequired,
//   beginUpdatingTodo: PropTypes.func.isRequired,
//   confirmUpdatingTodo: PropTypes.func.isRequired,
// }
