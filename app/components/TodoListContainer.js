import { connect } from '../redux/utils'
import * as actions from '../redux/actions'
import TodoList from './TodoList'

function mapStateToProps(state) {
  return ({
    todos: state.todos,
    currentUpdatingTodo: state.currentUpdatingTodo,
    currentUser: state.currentUser,
    choosenUser: state.choosenUser,
    currentViewMode: state.currentViewMode,
    addTodo: state.addTodo,
    todosInputValue: state.todosInputValue,
    timeoutId: state.timeoutId,
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    addTodo: () => dispatch(actions.addTodo),
    removeTodo: () => dispatch(actions.removeTodo),
    clearCompleted: () => dispatch(actions.clearCompleted),
    setViewModeAll: () => dispatch(actions.setViewModeAll),
    setViewModeActive: () => dispatch(actions.setViewModeActive),
    setViewModeCompleted: () => dispatch(actions.setViewModeCompleted),
    beginUpdatingTodo: () => dispatch(actions.beginUpdatingTodo),
    confirmUpdatingTodo: () => dispatch(actions.confirmUpdatingTodo),
    cancelUpdatingTodo: () => dispatch(actions.cancelUpdatingTodo),
    toggleReadyState: () => dispatch(actions.toggleReadyState),
    returnToTodosSelection: () => dispatch(actions.returnToTodosSelection),
    updateInputFieldValue: () => dispatch(actions.updateInputFieldValue),
  })
}

export default TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)
