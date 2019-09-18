// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

import InjectedTodoItem from './TodoItem'
import InjectedBottomPanel from './BottomPanel'

type Props = {
  store: {
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
    cancelUpdatingTodo: () => void,
    beginUpdatingTodo: () => void,
    confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
    updateTodoInputFieldValue: (
      event: SyntheticKeyboardEvent<HTMLInputElement>
    ) => void,
    updatingTodoInputValue: string,
    timeoutId: TimeoutID,
    handleClicks: (id: string, todoTitle: string) => void
  },
};

// @inject('store')
@observer
class TodoList extends React.Component<Props> {
  render() {
    const {
      store: {
        todos,
        currentUpdatingTodo,
        currentUser,
        choosenUser,
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
      },
    } = this.props
    let todosToRender = [...todos]
    if (currentViewMode === 'Completed') {
      todosToRender = todos.filter((todo) => todo.isCompleted)
    } else if (currentViewMode === 'Active') {
      todosToRender = todos.filter((todo) => !todo.isCompleted)
    }

    return (
      <section className="main-container">
        <input
          className={
            [currentUser, 'All'].includes(choosenUser)
              ? 'todo-input'
              : 'todo-input hidden'
          }
          type="text"
          onKeyDown={addTodo}
          onChange={updateInputFieldValue}
          value={todosInputValue}
        />
        <div className="todos-container">
          <ul className="todo-list">
            {todosToRender.map((todo) => (
              <InjectedTodoItem
                todo={todo}
                key={todo._id}
              />
            ))}
          </ul>
        </div>
        <InjectedBottomPanel
          quantity={todos.filter((todo) => !todo.isCompleted).length}
        />
      </section>
    )
  }
}

const InjectedTodoList = inject(({ store }) => ({ store }))(TodoList)


export default InjectedTodoList
