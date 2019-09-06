// @flow
/* eslint-disable react/state-in-constructor */
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './index.css'

import callApi, { PrivateRoute } from './components/helpers'
import LoginPanel from './components/LoginPanel'

type Props = {}

type State = {
  todos: Array<{
    title: string,
    _id: string,
    owner: string,
    isCompleted: boolean | string,
  }>,
  sharedUsers: Array<string>,
  isAuthenticated: boolean,
  currentUser: string,
  currentViewMode: "All" | "Active" | "Completed",
  nextId: number,
  todosInputValue: string,
  sharedUsersInputValue: string,
  updatingTodoInputValue: string,
  currentUpdatingTodo: ?string,
  loginFieldValue: string,
  passwordFieldValue: string,
}

class App extends React.Component<Props, State> {
  timeoutId: ?TimeoutID

  history: ?{
    replace: ?(string) => void,
  }

  constructor() {
    super()
    this.state = {
      todos: [],
      sharedUsers: [],
      isAuthenticated: !!localStorage.getItem('token'),
      currentUser: '',
      currentViewMode: 'All',
      nextId: 1,
      loginFieldValue: '',
      passwordFieldValue: '',
      todosInputValue: '',
      sharedUsersInputValue: '',
      updatingTodoInputValue: '',
      currentUpdatingTodo: null,
    }

    this.timeoutId = null
    this.history = createBrowserHistory()
  }

  componentDidMount():void {
    this.fetchData()
  }

  setViewModeAll = ():void => {
    this.setState(() => ({
      currentViewMode: 'All',
    }))
  }

  setViewModeActive = ():void => {
    this.setState(() => ({
      currentViewMode: 'Active',
    }))
  }

  setViewModeCompleted = ():void => {
    this.setState(() => ({
      currentViewMode: 'Completed',
    }))
  }

  login = (event: SyntheticKeyboardEvent<HTMLInputElement> | SyntheticMouseEvent<HTMLButtonElement>):void => {
    if (event.key === 'Enter' || event.currentTarget.classList.contains('login-button')) {
      const { loginFieldValue, passwordFieldValue } = this.state
      callApi('POST', { login: loginFieldValue, password: passwordFieldValue }, '/signUp')
        .then((response) => response.text())
        .then((result) => {
          if (result !== 'Forbidden') {
            localStorage.setItem('token', `Bearer ${result}`)
            this.setState(() => ({
              isAuthenticated: true,
            }))
            if (this.history && this.history.replace) {
              this.history.replace('/')
            }
            this.fetchData()
          } else {
            throw new Error('Invalid token')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  fetchData = ():void => {
    let isResponseOk = false
    callApi('GET')
      .then((response) => {
        isResponseOk = response.ok
        return response.json()
      })
      .then((result) => {
        console.log('fetch result: ')
        console.log(result)
        if (isResponseOk) {
          this.setState(() => ({
            sharedUsers: result.sharedUsers,
            todos: result.todos,
            currentUser: result.currentUser,
            isAuthenticated: true,
          }))
          console.log('state', this.state)
          localStorage.setItem('token', `Bearer ${result.token}`)
        } else {
          localStorage.removeItem('token')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  addTodo = (event: SyntheticKeyboardEvent<HTMLButtonElement>) :void => {
    const { todosInputValue, currentUser } = this.state
    let isResponseOk = false
    if (event.key === 'Enter') {
      callApi('POST', { title: todosInputValue, owner: currentUser })
        .then((response) => {
          isResponseOk = response.ok
          return response.json()
        })
        .then(() => {
          if (isResponseOk) {
            this.fetchData()
          }
        })
        .catch((e) => console.log(e))
      this.setState((prevState) => ({
        nextId: prevState.nextId + 1,
        todosInputValue: '',
        todos: [
          ...prevState.todos,
          {
            _id: prevState.nextId.toString(),
            title: prevState.todosInputValue,
            owner: prevState.currentUser,
            isCompleted: false,
          },
        ],
      }))
    }
  }

  beginUpdatingTodo = (id: string, todoTitle: string) :void => {
    this.setState(() => ({
      currentUpdatingTodo: id,
      updatingTodoInputValue: todoTitle,
    }))
  }

  confirmUpdatingTodo = (idToUpdate: string, newTitle: string) :void => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo._id === idToUpdate) {
          const newTodo = { ...todo }
          newTodo.title = newTitle

          callApi('PUT', { _id: idToUpdate, updKeyValue: { title: newTitle } })
            .then((response) => response.json())
            .catch((err) => console.log(err))

          return newTodo
        }
        return todo
      }),
      currentUpdatingTodo: null,
    }))
  }

  cancelUpdatingTodo = ():void => {
    this.setState(() => ({
      currentUpdatingTodo: null,
    }))
  }

  handleClicks = (id: string, todoTitle: string) :void => {
    if (this.timeoutId !== null) {
      console.log('double click executes')
      this.beginUpdatingTodo(id, todoTitle)
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    } else {
      console.log('single click')
      this.timeoutId = setTimeout(() => {
        console.log('first click executes ')
        this.toggleReadyState(id)
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }, 200)
    }
  }

  toggleReadyState = (idToUpdate: string) :void => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo._id === idToUpdate) {
          const newTodo = { ...todo }
          newTodo.isCompleted = !newTodo.isCompleted

          callApi('PUT', { _id: idToUpdate, updKeyValue: { isCompleted: newTodo.isCompleted } })
            .then((response) => response.json())
            .catch((err) => console.log(err))

          return newTodo
        }
        return todo
      }),
    }))
  }

  logout = () :void => {
    console.log('logged out')
    localStorage.removeItem('token')
    this.setState(() => ({
      isAuthenticated: false,
    }))
  }


  removeTodo = (idToDelete: string) :void => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo._id !== idToDelete),
    }))
    callApi('DELETE', { _id: `${idToDelete}` })
      .then((response) => response.json())
      .catch((err) => console.log(err))
  }

  clearCompleted = () :void => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => !todo.isCompleted),
    }))
    const todosToRemove = this.state.todos.filter((todo) => todo.isCompleted).map((todo) => todo._id)
    callApi('DELETE', { idArr: todosToRemove }, '/delete_many')
      .then((response) => {
        if (response.ok) {
          this.fetchData()
        }
      })
      .catch((e) => console.log(e))
  }

  updateLoginFieldValue = (event: SyntheticKeyboardEvent<HTMLInputElement>) :void => {
    // (event.currentTarget: HTMLInputElement)
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      loginFieldValue: `${etv}`,
    }))
  }

  updatePasswordFieldValue = (event: SyntheticKeyboardEvent<HTMLInputElement>) :void => {
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      passwordFieldValue: `${etv}`,
    }))
  }


  updateInputFieldValue = (event: SyntheticKeyboardEvent<HTMLInputElement>) :void => {
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      todosInputValue: `${etv}`,
    }))
  }

  updateTodoInputFieldValue = (event: SyntheticKeyboardEvent<HTMLInputElement>) :void => {
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      updatingTodoInputValue: `${etv}`,
    }))
  }

  updateSharedUsersFieldValue = (event: SyntheticKeyboardEvent<HTMLInputElement>) :void => {
    const etv = event.currentTarget.value
    this.setState(() => ({
      sharedUsersInputValue: `${etv}`,
    }))
  }

  addSharedUser = (event: SyntheticKeyboardEvent<HTMLInputElement>) :void => {
    const etv = event.currentTarget.value
    if (event.key === 'Enter') {
      this.setState((prevState) => ({
        sharedUsers: [...prevState.sharedUsers, etv],
        sharedUsersInputValue: '',
      }))
      callApi('PUT', { user: event.currentTarget.value }, '/user/addSharedUser')
    }
  }

  render(): React.Element<any> {
    const {
      todos,
      nextId,
      todosInputValue,
      sharedUsers,
      currentUser,
      currentViewMode,
      sharedUsersInputValue,
      isAuthenticated,
      currentUpdatingTodo,
      updatingTodoInputValue,
      loginFieldValue,
      passwordFieldValue,
    } = this.state

    console.log('render called')
    let todosToRender = [...todos]
    if (currentViewMode === 'Completed') {
      todosToRender = todos.filter((todo) => todo.isCompleted)
    } else if (currentViewMode === 'Active') {
      todosToRender = todos.filter((todo) => !todo.isCompleted)
    }
    return (
      <Router history={this.history}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <LoginPanel
                login={this.login}
                loginFieldValue={loginFieldValue}
                passwordFieldValue={passwordFieldValue}
                updateLoginFieldValue={this.updateLoginFieldValue}
                updatePasswordFieldValue={this.updatePasswordFieldValue}
              />
            )}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            currentUpdatingTodo={currentUpdatingTodo}
            addTodo={this.addTodo}
            updateInputFieldValue={this.updateInputFieldValue}
            setViewModeAll={this.setViewModeAll}
            setViewModeActive={this.setViewModeActive}
            setViewModeCompleted={this.setViewModeCompleted}
            toggleReadyState={this.toggleReadyState}
            removeTodo={this.removeTodo}
            clearCompleted={this.clearCompleted}
            todosInputValue={todosInputValue}
            nextId={nextId}
            todos={todos}
            todosToRender={todosToRender}
            currentUser={currentUser}
            currentViewMode={currentViewMode}
            sharedUsers={sharedUsers}
            sharedUsersInputValue={sharedUsersInputValue}
            updateSharedUsersFieldValue={this.updateSharedUsersFieldValue}
            addSharedUser={this.addSharedUser}
            logout={this.logout}
            cancelUpdatingTodo={this.cancelUpdatingTodo}
            beginUpdatingTodo={this.beginUpdatingTodo}
            confirmUpdatingTodo={this.confirmUpdatingTodo}
            updateTodoInputFieldValue={this.updateTodoInputFieldValue}
            updatingTodoInputValue={updatingTodoInputValue}
            timeoutId={this.timeoutId}
            handleClicks={this.handleClicks}
          />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, // $FlowIgnore
  document.getElementById('app'))
