// @flow
import React, { SyntheticKeyboardEvent } from 'react'
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
  choosenUser: string,
  currentViewMode: "All" | "Active" | "Completed",
  cancelUpdatingTodo: () => void,
  beginUpdatingTodo: () => void,
  confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
  updateTodoInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  updatingTodoInputValue: string,
  timeoutId: TimeoutID,
  handleClicks: (id: string, todoTitle: string) => void,
}

export default class TodoList extends React.Component {
  construtor(props: Props) {
    super(props)
    todos = this.props.todos
    currentUpdatingTodo = this.props.currentUpdatingTodo
    todosToRender = this.props.todosToRender
    currentUser = this.props.currentUser
    choosenUser = this.props.choosenUser
    currentViewMode = this.props.currentViewMode
    addTodo = this.props.addTodo
    todosInputValue = this.props.todosInputValue
    updateInputFieldValue = this.props.updateInputFieldValue
    setViewModeAll = this.props.setViewModeAll
    setViewModeActive = this.props.setViewModeActive
    setViewModeCompleted = this.props.setViewModeCompleted
    toggleReadyState = this.props.toggleReadyState
    removeTodo = this.props.removeTodo
    clearCompleted = this.props.clearCompleted
    cancelUpdatingTodo = this.props.cancelUpdatingTodo
    beginUpdatingTodo = this.props.beginUpdatingTodo
    confirmUpdatingTodo = this.props.confirmUpdatingTodo
    updateTodoInputFieldValue = this.props.updateTodoInputFieldValue
    updatingTodoInputValue = this.props.updatingTodoInputValue
    timeoutId = this.props.timeoutId
    handleClicks = this.props.handleClicks
  }


  render() {
    return (

      <section className="main-container">
        <input className={[currentUser, 'All'].includes(choosenUser) ? 'todo-input' : 'todo-input hidden'} type="text" onKeyDown={addTodo} onChange={updateInputFieldValue} value={todosInputValue} />
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
}
