// @flow
import {
  observable, action, toJS,
} from 'mobx'
import { createBrowserHistory } from 'history'

import callApi from './components/helpers'

export default class Store {
  timeoutId: ?TimeoutID

  history: ?{
    replace: ?(string) => void
  }

  @observable todos = []

  @observable sharedUsers = []

  @observable externalUsers = []

  @observable isAuthenticated = !!localStorage.getItem('token')

  @observable currentUser = null

  @observable choosenUser = null

  @observable currentViewMode = 'All'

  @observable loginFieldValue = ''

  @observable passwordFieldValue = ''

  @observable todosInputValue = ''

  @observable sharedUsersInputValue = ''

  @observable updatingTodoInputValue = ''

  @observable currentUpdatingTodo = null

  @observable timeoutId = null

  @observable showModal = false

  @observable modalInnerText = ''

  history = createBrowserHistory()

  @action modalOpen = (text: string): void => {
    this.modalInnerText = text
    this.showModal = true
  }

  @action modalClose = (): void => {
    this.showModal = false
  }

  @action setViewModeAll = (): void => {
    this.currentViewMode = 'All'
  }

  @action setViewModeActive = (): void => {
    this.currentViewMode = 'Active'
  }

  @action setViewModeCompleted = (): void => {
    this.currentViewMode = 'Completed'
  }

  @action signUp = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
      | SyntheticMouseEvent<HTMLButtonElement>,
  ): void => {
    if (
      event.key === 'Enter'
      || event.currentTarget.classList.contains('login-button')
    ) {
      callApi(
        'POST',
        { login: this.loginFieldValue, password: this.passwordFieldValue },
        '/user/signUp',
      )
        .then((response) => response.text())
        .then((result) => {
          if (result !== 'Forbidden') {
            localStorage.setItem('token', `Bearer ${result}`)
            this.isAuthenticated = true
            if (this.history && this.history.replace) {
              this.history.replace('/')
            }
            localStorage.setItem('login', `${this.loginFieldValue}`)
            this.fetchUsersData(this.loginFieldValue)
          } else {
            throw new Error('Something went wrong')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }


  @action login = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
      | SyntheticMouseEvent<HTMLButtonElement>,
  ): void => {
    // try {
    if (
      event.key === 'Enter'
        || event.currentTarget.classList.contains('login-button')
    ) {
      callApi(
        'POST',
        { login: this.loginFieldValue, password: this.passwordFieldValue },
        '/user/login',
      )
        .then((response) => {
          console.log('response.status: ', response.status)
          if (response.status !== 200) throw new Error('123')
          return response.text()
        })
        .then((result) => {
          // if (result !== 'Forbidden') {
          localStorage.setItem('token', `Bearer ${result}`)
          this.isAuthenticated = true
          if (this.history && this.history.replace) {
            this.history.replace('/')
          }
          localStorage.setItem('login', `${this.loginFieldValue}`)
          this.fetchUsersData(this.loginFieldValue)
          // } else {
          //   throw new Error('Wrong login or password')
          // }
        })
        .catch(() => {
          this.modalOpen('Wrong login or password')
        })
    }
    // } catch (err) {
    //   alert('err')
    //   console.log('catched')
    //   console.error(err)
    // }
  }

  @action logout = (): void => {
    localStorage.removeItem('token')
    this.isAuthenticated = false
    this.choosenUser = ''
  }

  @action fetchUsersData = (username: string): void => {
    let isResponseOk = false
    if (typeof username !== 'string') return
    callApi('GET', null, `/user/get/${username}`)
      .then((response) => {
        isResponseOk = response.ok
        return response.json()
      })
      .then(action((result) => {
        if (isResponseOk) {
          this.currentUser = username
          this.sharedUsers = result.sharedUsers
          this.externalUsers = result.externalUsers
        }
      }))
  }

  @action fetchData = (username: string): void => {
    let isResponseOk = false
    if (typeof this.currentUser !== 'string' && typeof username !== 'string') return
    const path = username === 'All' ? `/todos/all/${this.currentUser}` : `/todos/${username}`
    callApi('GET', null, path)
      .then((response) => {
        isResponseOk = response.ok
        return response.json()
      })
      .then(action((result) => {
        if (isResponseOk) {
          this.todos = result
        } else {
          localStorage.removeItem('token')
        }
      }))
      .catch((err) => {
        console.error(err)
      })
  }

  @action addTodo = (event: SyntheticKeyboardEvent<HTMLButtonElement>): void => {
    const temporaryId = Math.random()
    const todoTitle = this.todosInputValue
    if (event.key === 'Enter') {
      this.todosInputValue = ''
      this.todos = [...this.todos, { _id: temporaryId, title: todoTitle, owner: this.currentUser }]
      callApi('POST', { title: todoTitle, owner: this.currentUser }, '/todos/')
        .then((response) => response.json())
        .then(action((_id) => {
          this.todos = this.todos.map((todo: Object): Object => {
            if (todo.title === todoTitle) {
              const newTodo = { ...todo }
              newTodo._id = _id
              return newTodo
            }
            return todo
          })
        }))
        .catch(action(() => {
          this.todos = this.todos.filter((todo: Object): boolean => todo._id !== temporaryId)
          this.modalOpen('Todo already exists')
        }))
    }
  }

  @action beginUpdatingTodo = (id: string, todoTitle: string): void => {
    this.currentUpdatingTodo = id
    this.updatingTodoInputValue = todoTitle
  }

  @action confirmUpdatingTodo = (idToUpdate: string, newTitle: string): void => {
    let oldTitleCopy
    try {
      this.todos = this.todos.map((todo: Object): Object => {
        if (todo._id === idToUpdate) {
          oldTitleCopy = todo.title
          const newTodo = { ...todo }
          newTodo.title = newTitle

          return newTodo
        }
        return todo
      })

      this.currentUpdatingTodo = null
      callApi('PUT', { _id: idToUpdate, updKeyValue: { title: newTitle } }, '/todos/')
        .then((response) => response.json())
    } catch (err) {
      this.todos = this.todos.map((todo: Object): Object => {
        if (todo._id === idToUpdate) {
          const newTodo = { ...todo }
          newTodo.title = oldTitleCopy
          return newTodo
        }
        return todo
      })
      this.currentUpdatingTodo = null
    }
  }

  @action cancelUpdatingTodo = (): void => {
    this.currentUpdatingTodo = null
  }

  @action handleClicks = (id: string, todoTitle: string): void => {
    if (this.timeoutId !== null) {
      this.beginUpdatingTodo(id, todoTitle)
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    } else {
      this.timeoutId = setTimeout(action(() => {
        this.toggleReadyState(id)
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }), 200)
    }
  }

  @action setChoosenUser = (username: string): void => {
    this.choosenUser = username
    this.fetchData(username)
  }

  @action toggleReadyState = (idToUpdate: string): void => {
    let isTodoCompleted
    try {
      this.todos = this.todos.map((todo: Object): Object => {
        if (todo._id === idToUpdate) {
          const newTodo = { ...todo }
          isTodoCompleted = newTodo.isCompleted
          newTodo.isCompleted = !newTodo.isCompleted
          return newTodo
        }
        return todo
      })

      callApi('PUT', {
        _id: idToUpdate,
        updKeyValue: { isCompleted: !isTodoCompleted },
      },
      '/todos')
        .then((response) => response.json())
        .then(action((result) => {
          if (result.matchedCount === 0) {
            throw new Error('DB error')
          }
        }))
    } catch (err) {
      this.todos = this.todos.map((todo: Object): Object => {
        if (todo._id === idToUpdate) {
          const newTodo = { ...todo }
          newTodo.isCompleted = isTodoCompleted
          return newTodo
        }
        return todo
      })
    }
  }

  @action returnToTodosSelection = (): void => {
    this.choosenUser = null
  }

  @action removeTodo = (idToDelete: string): void => {
    const todosCopy = [...this.todos]
    try {
      this.todos = this.todos.filter((todo: Object): boolean => todo._id !== idToDelete)
      callApi('DELETE', { _id: `${idToDelete}` }, '/todos')
        .then((response) => response.json())
    } catch (err) {
      this.todos = todosCopy
    }
  }

  @action clearCompleted = (): void => {
    const todosCopy = [...this.todos]
    try {
      const todosToRemove = toJS(this.todos)
        .filter((todo: Object): boolean => todo.isCompleted)
        .map((todo: Object): string => todo._id)

      this.todos = this.todos.filter((todo): boolean => !todo.isCompleted)

      console.log(todosToRemove)
      callApi('DELETE', { idArr: todosToRemove }, '/todos/delete_many')
        .then((response) => {
          if (response.ok && typeof this.choosenUser === 'string') {
            this.fetchData(this.choosenUser)
          }
        })
    } catch (err) {
      this.todos = todosCopy
    }
  }

  @action updateLoginFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.loginFieldValue = `${etv}`
  }

  @action updatePasswordFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.passwordFieldValue = `${etv}`
  }

  @action updateInputFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.todosInputValue = `${etv}`
  }

  @action updateTodoInputFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.updatingTodoInputValue = `${etv}`
  }

  @action updateSharedUsersFieldValue = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  ): void => {
    const etv = event.currentTarget.value
    this.sharedUsersInputValue = `${etv}`
  }

  @action addSharedUser = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const reserveCopy = [...this.sharedUsers]
    let responseStatus = null

    try {
      if (event.key === 'Enter') {
        if (!this.sharedUsers.includes(this.sharedUsersInputValue)) {
          this.sharedUsers.push(this.sharedUsersInputValue)
        } else {
          const index = this.sharedUsers.findIndex((user: string) => user === this.sharedUsersInputValue)
          const movedUser = this.sharedUsers.splice(index, 1)
          this.sharedUsers.push(movedUser)
        }

        callApi(
          'POST',
          { login: this.currentUser, newSharedUserLogin: this.sharedUsersInputValue },
          '/user/addSharedUser',
        )
          .then(action((response) => {
            this.sharedUsersInputValue = ''
            if (responseStatus === 404) throw new Error('User not found')
            responseStatus = response.status
            return response.json()
          }))
          .catch(action(() => {
            this.sharedUsers = reserveCopy
            this.modalOpen('User not found')
          }))
      }
    } catch (err) {
      this.sharedUsers = reserveCopy
    }
  }
}
