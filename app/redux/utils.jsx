import React from 'react'

import { Consumer } from '../index'

export const createStore = (reducerFunc, initialState) => {
  const reducer = reducerFunc
  let state = initialState
  let listener = () => {}

  return {
    getState() {
      return state
    },
    dispatch(action) {
      state = reducer(state, action)
      listener()
      return action
    },
    subscribe(newListener) {
      listener = newListener
    },
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrappedComponent) => class extends React.Component {
    // eslint-disable-next-line react/static-property-placement
    static contextType = Context

    componentDidMount() {
      this.unsubscribe = this.context.store.subscribe(this.handleChange.bind(this))
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    handleChange() {
      this.forceUpdate()
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...mapStateToProps(store.getState(), this.props)}
          {...mapDispatchToProps(store.dispatch, this.props)}
        />
      )
    }
  }
}

// export function connect(mapStateToProps, mapDispatchToProps) {
//   return (Component) => (
//     <Component {...mapDispatchToProps} {...mapStateToProps} />
//   )
// }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_DATA':
      return {
        ...state,
        currentUser: action.currentUser,
        sharedUsers: action.sharedUsers,
        externalUsers: action.externalUsers,
        token: action.token,
      }
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.todos,
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.todo],
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id != action._id),
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      }
    case 'SET_VIEW_MODE_ALL':
      return {
        ...state,
        currentViewMode: 'All',
      }
    case 'SET_VIEW_MODE_ACTIVE':
      return {
        ...state,
        currentViewMode: 'Active',
      }
    case 'SET_VIEW_MODE_COMPLETED':
      return {
        ...state,
        currentViewMode: 'Completed',
      }
    case 'BEGIN_UPDATING_TODO':
      return {
        ...state,
        currentUpdatingTodo: action._id,
        updatingTodoInputValue: state.todos.find((todo) => todo._id === action._id).title,
      }
    case 'CONFIRM_UPDATING_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action._id) {
            const newTodo = { ...todo }
            newTodo.title = state.updatingTodoInputValue
            return newTodo
          }
          return todo
        }),
      }
    case 'CANCEL_UPDATING_TODO':
      return {
        ...state,
        currentUpdatingTodo: null,
      }
    case 'SET_CHOOSEN_USER':
      return {
        ...state,
        choosenUser: action.choosenUser,
      }
    case 'RETURN_TO_TODOS_SELECTION':
      return {
        ...state,
        choosenUser: null,
      }
    case 'TOGGLE_READY_STATE':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action._id) {
            const newTodo = { ...todo }
            newTodo.isCompleted = !todo.isCompleted
            return newTodo
          }
          return todo
        }),
      }
    case 'ADD_SHARED_USER':
      return {
        ...state,
        sharedUsers: [...state.sharedUsers, action.sharedUser],
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      }
    case 'UPDATE_LOGIN_FIELD_VALUE':
      return {
        ...state,
        loginFieldValue: action.value,
      }
    case 'UPDATE_PASSWORD_FIELD_VALUE':
      return {
        ...state,
        passwordFieldValue: action.value,
      }
    case 'UPDATE_INPUT_FIELD_VALUE':
      return {
        ...state,
        todosInputValue: action.value,
      }
    case 'UPDATE_TODO_INPUT_FIELD_VALUE':
      return {
        ...state,
        updatingTodoInputValue: action.value,
      }
    case 'UPDATE_SHARED_USERS_FIELD_VALUE':
      return {
        ...state,
        sharedUsersInputValue: action.value,
      }
    default:
      return state
  }
}
