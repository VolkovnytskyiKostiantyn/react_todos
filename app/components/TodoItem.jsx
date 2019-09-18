// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import { inject } from './typedInject'

type Props = {
  todo: {
    title: string,
    _id: string,
    owner: string,
    isCompleted: boolean | string
  },
  store: {
    currentUpdatingTodo: string,
    currentUser: string,
    removeTodo: (idToDelete: string) => void,
    cancelUpdatingTodo: () => void,
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
class TodoItem extends React.Component<Props> {
  render() {
    const {
      store: {
        currentUpdatingTodo,
        currentUser,
        removeTodo,
        cancelUpdatingTodo,
        confirmUpdatingTodo,
        updateTodoInputFieldValue,
        updatingTodoInputValue,
        timeoutId,
        handleClicks,
      },
      todo,
    } = this.props
    const {
      title, _id, owner, isCompleted,
    } = todo

    if (_id === currentUpdatingTodo) {
      return (
        <li className="todo-item" id={_id}>
          <div className="updating-input-container">
            <input
              type="checkbox"
              checked={isCompleted}
              readOnly
              className="checkbox"
            />
            <input
              type="text"
              value={updatingTodoInputValue}
              onChange={updateTodoInputFieldValue}
            />
            <button
              type="button"
              className="submit-button"
              dangerouslySetInnerHTML={{ __html: '&#10004;' }}
              onClick={() => confirmUpdatingTodo(_id, updatingTodoInputValue)}
            />
            <button
              type="button"
              className="cancel-button"
              dangerouslySetInnerHTML={{ __html: '&times' }}
              onClick={cancelUpdatingTodo}
            />
          </div>
          <div>
            <span className="owner">
              owner:
              {' '}
              {owner === currentUser ? 'You' : owner}
            </span>
            <button
              className="remove-button"
              type="button"
              onClick={() => removeTodo(_id)}
              dangerouslySetInnerHTML={{ __html: '&times' }}
            />
          </div>
        </li>
      )
    }
    return (
      <li className="todo-item" id={_id}>
        <div className="connector" onClick={() => handleClicks(_id, title)}>
          <input type="checkbox" checked={isCompleted} className="checkbox" />
          <span className={isCompleted ? 'title-span completed' : 'title-span'}>
            {title}
          </span>
        </div>
        <div>
          <span className="owner">
            owner:
            {' '}
            {owner === currentUser ? 'You' : owner}
          </span>
          <button
            className="remove-button"
            type="button"
            onClick={owner === currentUser ? () => removeTodo(_id) : false}
            dangerouslySetInnerHTML={{ __html: '&times' }}
          />
        </div>
      </li>
    )
  }
}

const InjectedTodoItem = inject(({ store }) => ({ store }))(TodoItem)


export default InjectedTodoItem
