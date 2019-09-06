// @flow
import React from 'react'
// import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import BottomPanel from './BottomPanel'

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
  cancelUpdatingTodo: () => void,
  beginUpdatingTodo: () => void,
  confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
  updateTodoInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  updatingTodoInputValue: string,
  timeoutId: TimeoutID,
  handleClicks: (id: string, todoTitle: string) => void,
}

export default function TodoList(props: Props) {
  const {
    todos,
    currentUpdatingTodo,
    todosToRender,
    currentUser,
    currentViewMode,
    addTodo,
    todosInputValue,
    updateInputFieldValue,
    setViewModeAll,
    setViewModeActive,
    setViewModeCompleted,
    toggleReadyState,
    removeTodo,
    clearCompleted,
    cancelUpdatingTodo,
    beginUpdatingTodo,
    confirmUpdatingTodo,
    updateTodoInputFieldValue,
    updatingTodoInputValue,
    timeoutId,
    handleClicks,
  } = props
  return (
    <section className="main-container">
      <input className="todo-input" type="text" onKeyDown={addTodo} onChange={updateInputFieldValue} value={todosInputValue} />
      <div className="todos-container">
        <ul className="todo-list">
          {
          todosToRender.map((todo) => (
            <TodoItem
              todo={todo}
              currentUpdatingTodo={currentUpdatingTodo}
              updateTodoInputFieldValue={updateTodoInputFieldValue}
              cancelUpdatingTodo={cancelUpdatingTodo}
              beginUpdatingTodo={beginUpdatingTodo}
              confirmUpdatingTodo={confirmUpdatingTodo}
              currentUser={currentUser}
              toggleReadyState={toggleReadyState}
              removeTodo={removeTodo}
              updatingTodoInputValue={updatingTodoInputValue}
              timeoutId={timeoutId}
              handleClicks={handleClicks}
              key={todo._id}

            />
          ))
          }
        </ul>
      </div>
      <BottomPanel
        setViewModeAll={setViewModeAll}
        setViewModeActive={setViewModeActive}
        setViewModeCompleted={setViewModeCompleted}
        clearCompleted={clearCompleted}
        currentViewMode={currentViewMode}
        quantity={todos.filter((todo) => !todo.isCompleted).length}
      />
    </section>
  )
}

// TodoList.defaultProps = {
//   todosToRender: [],
//   currentUser: '',
//   todosInputValue: '',
// }

// TodoList.propTypes = {
//   todosToRender: PropTypes.arrayOf(PropTypes.object),
//   currentUser: PropTypes.string,
//   addTodo: PropTypes.func.isRequired,
//   todosInputValue: PropTypes.string,
//   updateInputFieldValue: PropTypes.func.isRequired,
//   setViewModeAll: PropTypes.func.isRequired,
//   setViewModeActive: PropTypes.func.isRequired,
//   setViewModeCompleted: PropTypes.func.isRequired,
//   toggleReadyState: PropTypes.func.isRequired,
//   removeTodo: PropTypes.func.isRequired,
//   clearCompleted: PropTypes.func.isRequired,
// }
