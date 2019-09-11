const addTodo = (title, currentUser) => ({
  type: 'ADD_TODO',
  todo: { title, isCompleted: false, owner: currentUser },
})

const removeTodo = (_id) => ({
  type: 'REMOVE_TODO',
  _id,
})

const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
})

const setViewModeAll = () => ({
  type: 'SET_VIEW_MODE_ALL',
})

const setViewModeActive = () => ({
  type: 'SET_VIEW_MODE_ACTIVE',
})

const setViewModeCompleted = () => ({
  type: 'SET_VIEW_MODE_COMPLETED',
})

const beginUpdatingTodo = (_id) => ({
  type: 'BEGIN_UPDATING_TODO',
  _id,
})

const confirmUpdatingTodo = (_id) => ({
  type: 'CONFIRM_UPDATING_TODO',
  _id,
})

const cancelUpdatingTodo = () => ({
  type: 'CANCEL_UPDATING_TODO',
})

const setChoosenUser = (choosenUser) => ({
  type: 'SET_CHOOSEN_USER',
  choosenUser,
})

const returnToTodosSelection = () => ({
  type: 'RETURN_TO_TODOS_SELECTION',
})

const toggleReadyState = (_id) => ({
  type: 'TOGGLE_READY_STATE',
  _id,
})

const addSharedUser = (sharedUser) => ({
  type: 'ADD_SHARED_USER',
  sharedUser,
})

const login = () => ({
  type: 'LOGIN',
})

const logout = () => ({
  type: 'LOGOUT',
})

const updateLoginFieldValue = (value) => ({
  type: 'UPDATE_LOGIN_FIELD_VALUE',
  value,
})

const updatePasswordFieldValue = (value) => ({
  type: 'UPDATE_PASSWORD_FIELD_VALUE',
  value,
})

const updateInputFieldValue = (value) => ({
  type: 'UPDATE_INPUT_FIELD_VALUE',
  value,
})

const updateTodoInputFieldValue = (value) => ({
  type: 'UPDATE_TODO_INPUT_FIELD_VALUE',
  value,
})

const updateSharedUsersFieldValue = (value) => ({
  type: 'UPDATE_SHARED_USERS_FIELD_VALUE',
  value,
})

export * from './actions'
