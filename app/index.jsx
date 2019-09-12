/* eslint-disable no-console */
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
    isCompleted: boolean | string
  }>,
  sharedUsers: Array<string>,
  externalUsers: Array<string>,
  isAuthenticated: boolean,
  currentUser: null,
  choosenUser: string,
  currentViewMode: "All" | "Active" | "Completed",
  todosInputValue: string,
  sharedUsersInputValue: string,
  updatingTodoInputValue: string,
  currentUpdatingTodo: ?string,
  loginFieldValue: string,
  passwordFieldValue: string
}

class App extends React.Component<Props, State> {
  timeoutId: ?TimeoutID

  history: ?{
    replace: ?(string) => void
  }

  constructor() {
    super()
    this.state = {
      todos: [],
      sharedUsers: [],
      externalUsers: [],
      isAuthenticated: !!localStorage.getItem('token'),
      currentUser: null,
      choosenUser: null,
      currentViewMode: 'All',
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

  componentDidMount(): void {
    if (localStorage.getItem('login')) {
      this.fetchUsersData(localStorage.getItem('login'))
    }
  }

  setViewModeAll = (): void => {
    this.setState(() => ({
      currentViewMode: 'All',
    }))
  }

  setViewModeActive = (): void => {
    this.setState(() => ({
      currentViewMode: 'Active',
    }))
  }

  setViewModeCompleted = (): void => {
    this.setState(() => ({
      currentViewMode: 'Completed',
    }))
  }

  signUp = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
      | SyntheticMouseEvent<HTMLButtonElement>,
  ): void => {
    if (
      event.key === 'Enter'
      || event.currentTarget.classList.contains('login-button')
    ) {
      const { loginFieldValue, passwordFieldValue } = this.state
      callApi(
        'POST',
        { login: loginFieldValue, password: passwordFieldValue },
        '/user/signUp',
      )
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
            localStorage.setItem('login', `${loginFieldValue}`)
            this.fetchUsersData(loginFieldValue)
          } else {
            throw new Error('Something went wrong')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }


  login = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
      | SyntheticMouseEvent<HTMLButtonElement>,
  ): void => {
    if (
      event.key === 'Enter'
      || event.currentTarget.classList.contains('login-button')
    ) {
      const { loginFieldValue, passwordFieldValue } = this.state
      callApi(
        'POST',
        { login: loginFieldValue, password: passwordFieldValue },
        '/user/login',
      )
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
            localStorage.setItem('login', `${loginFieldValue}`)
            this.fetchUsersData(loginFieldValue)
          } else {
            throw new Error('Wrong login or password')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  logout = (): void => {
    localStorage.removeItem('token')
    this.setState(() => ({
      isAuthenticated: false,
      choosenUser: '',
    }))
  }

  fetchUsersData = (username): void => {
    console.log('fetching users data')
    let isResponseOk = false
    callApi('GET', null, `/user/get/${username}`)
      .then((response) => {
        isResponseOk = response.ok
        return response.json()
      })
      .then((result) => {
        console.log('result: ', result)
        if (isResponseOk) {
          console.log('isResponseOk: ', isResponseOk)
          this.setState(() => ({
            currentUser: username,
            sharedUsers: result.sharedUsers,
            externalUsers: result.externalUsers,
          }))
        }
      })
  }

  fetchData = (username): void => {
    const { currentUser } = this.state
    let isResponseOk = false
    const path = username === 'All' ? `/todos/all/${currentUser}` : `/todos/${username}`
    callApi('GET', null, path)
      .then((response) => {
        isResponseOk = response.ok
        console.log('isResponseOk: ', isResponseOk)
        return response.json()
      })
      .then((result) => {
        if (isResponseOk) {
          this.setState(() => ({
            // sharedUsers: result.sharedUsers,
            todos: result,
            // isAuthenticated: true,
            // externalUsers: result.externalUsers,
          }))
        } else {
          console.log('removed token')
          localStorage.removeItem('token')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  addTodo = (event: SyntheticKeyboardEvent<HTMLButtonElement>): void => {
    const { todosInputValue, currentUser, choosenUser } = this.state
    if (event.key === 'Enter') {
      callApi('POST', { title: todosInputValue, owner: currentUser }, '/todos/')
        .then((response) => response.json())
        .then((_id) => {
          this.setState((prevState) => ({
            todos: [...prevState.todos, {
              _id, title: todosInputValue, owner: currentUser, isCompleted: false,
            }],
            todosInputValue: '',
          }), () => console.log(this.state.todos))
        })
        .catch((err) => console.error(err))
    }
  }

  beginUpdatingTodo = (id: string, todoTitle: string): void => {
    this.setState(() => ({
      currentUpdatingTodo: id,
      updatingTodoInputValue: todoTitle,
    }))
  }

  confirmUpdatingTodo = (idToUpdate: string, newTitle: string): void => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo._id === idToUpdate) {
          const newTodo = { ...todo }
          newTodo.title = newTitle

          callApi('PUT', { _id: idToUpdate, updKeyValue: { title: newTitle } }, '/todos/')
            .then((response) => response.json())
            .catch((err) => console.error(err))

          return newTodo
        }
        return todo
      }),
      currentUpdatingTodo: null,
    }))
  }

  cancelUpdatingTodo = (): void => {
    this.setState(() => ({
      currentUpdatingTodo: null,
    }))
  }

  handleClicks = (id: string, todoTitle: string): void => {
    if (this.timeoutId !== null) {
      this.beginUpdatingTodo(id, todoTitle)
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    } else {
      this.timeoutId = setTimeout(() => {
        this.toggleReadyState(id)
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }, 200)
    }
  }

  setChoosenUser = (username): void => {
    this.setState(() => ({
      choosenUser: username,
    }))
    this.fetchData(username)
    console.log('choosenUser in set', this.state.choosenUser)
  }

  toggleReadyState = (idToUpdate: string): void => {
    const { todos } = this.state
    const { isCompleted } = todos.find((todo) => todo._id === idToUpdate)
    console.log('isCompleted: ', isCompleted)
    callApi('PUT', {
      _id: idToUpdate,
      updKeyValue: { isCompleted: !isCompleted },
    },
    '/todos')
      .then((response) => response.json())
      .then((result) => {
        console.log('result: ', result.matchedCount)
        if (result.matchedCount === 1) {
          this.setState((prevState) => ({
            todos: prevState.todos.map((todo) => {
              if (todo._id === idToUpdate) {
                const newTodo = { ...todo }
                newTodo.isCompleted = !newTodo.isCompleted
                return newTodo
              }
              return todo
            }),
          }))
        }
      })
  }

  returnToTodosSelection = (): void => {
    this.setState(() => ({
      choosenUser: null,
    }))
  }

  removeTodo = (idToDelete: string): void => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo._id !== idToDelete),
    }))
    callApi('DELETE', { _id: `${idToDelete}` }, '/todos')
      .then((response) => response.json())
      .catch((err) => console.error(err))
  }

  clearCompleted = (): void => {
    const { todos, choosenUser } = this.state
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => !todo.isCompleted),
    }))
    const todosToRemove = todos
      .filter((todo) => todo.isCompleted)
      .map((todo) => todo._id)
    callApi('DELETE', { idArr: todosToRemove }, '/todos/delete_many')
      .then((response) => {
        if (response.ok) {
          this.fetchData(choosenUser)
        }
      })
      .catch((err) => console.error(err))
  }

  updateLoginFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    // (event.currentTarget: HTMLInputElement)
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      loginFieldValue: `${etv}`,
    }))
  }

  updatePasswordFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      passwordFieldValue: `${etv}`,
    }))
  }

  updateInputFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      todosInputValue: `${etv}`,
    }))
  }

  updateTodoInputFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.setState((prevState) => ({
      updatingTodoInputValue: `${etv}`,
    }))
  }

  updateSharedUsersFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.setState(() => ({
      sharedUsersInputValue: `${etv}`,
    }))
  }

  addSharedUser = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const { currentUser, sharedUsers } = this.state
    // const etv = event.currentTarget.value
    let isOk = false
    const reserveCopy = [...sharedUsers]
    if (event.key === 'Enter') {
      callApi(
        'POST',
        { login: currentUser, newSharedUserLogin: event.currentTarget.value },
        '/user/addSharedUser',
      )
        .then((response) => {
          console.log('responseStatus', typeof response.status)
          isOk = response.ok
          return response.json()
        })
        .then((result) => {
          if (!isOk) {
            this.setState(() => ({
              sharedUsers: reserveCopy,
              sharedUsersInputValue: '',
            }))
          } else {
            console.log('+++++++++++++')
            this.setState(() => ({
              sharedUsers: result,
              sharedUsersInputValue: '',
            }))
          }
        })
        .catch((err) => console.error(err))

      this.setState(() => ({
        sharedUsersInputValue: '',
      }))
    }
  }

  render(): React.Element<any> {
    const {
      todos,
      todosInputValue,
      sharedUsers,
      externalUsers,
      currentUser,
      currentViewMode,
      sharedUsersInputValue,
      isAuthenticated,
      currentUpdatingTodo,
      updatingTodoInputValue,
      loginFieldValue,
      passwordFieldValue,
      choosenUser,
    } = this.state

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
            todos={todos}
            todosToRender={todosToRender}
            currentUser={currentUser}
            currentViewMode={currentViewMode}
            sharedUsers={sharedUsers}
            externalUsers={externalUsers}
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
            choosenUser={choosenUser}
            setChoosenUser={this.setChoosenUser}
            returnToTodosSelection={this.returnToTodosSelection}
          />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />, // $FlowIgnore
  document.getElementById('app'),
)
