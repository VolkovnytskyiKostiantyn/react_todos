/* eslint-disable no-console */
// @flow
/* eslint-disable react/state-in-constructor */
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { configure } from 'mobx'
import { observer } from 'mobx-react'
import { Provider } from './components/typedInject'
import './index.css'

import Store from './Store'
import InjectedPrivateRoute from './components/PrivateRoute'
import InjectedLoginPanel from './components/LoginPanel'
import InjectedSignUpPanel from './components/SignUpPanel'
import InjectedModalWindow from './components/Modal'

configure({ enforceActions: 'observed' })

type Props = {
  store: {
    todos: Array<{
      title: string,
      _id: string,
      owner: string,
      isCompleted: boolean | string
    }>,
    sharedUsers: Array<string>,
    externalUsers: Array<string>,
    isAuthenticated: boolean,
    currentUser: string | null,
    choosenUser: string | null,
    currentViewMode: "All" | "Active" | "Completed",
    todosInputValue: string,
    sharedUsersInputValue: string,
    updatingTodoInputValue: string,
    currentUpdatingTodo: string | null,
    loginFieldValue: string,
    passwordFieldValue: string,
    history: Object,
    fetchUsersData: (username: string) => void,
    setViewModeAll: () => void,
    setViewModeActive: () => void,
    setViewModeCompleted: () => void,
    signUp: (
      event: | SyntheticKeyboardEvent<HTMLInputElement>
        | SyntheticMouseEvent<HTMLButtonElement>
    ) => void,
    login: (
      event: | SyntheticKeyboardEvent<HTMLInputElement>
        | SyntheticMouseEvent<HTMLButtonElement>
    ) => void,
    logout: () => void,
    fetchUsersData: (username: string) => void,
    fetchData: (username: string) => void,
    addTodo: (event: SyntheticKeyboardEvent<HTMLButtonElement>) => void,
    beginUpdatingTodo: (id: string, todoTitle: string) => void,
    confirmUpdatingTodo: (idToUpdate: string, newTitle: string) => void,
    cancelUpdatingTodo: () => void,
    handleClicks: (id: string, todoTitle: string) => void,
    setChoosenUser: (username: string) => void,
    toggleReadyState: (idToUpdate: string) => void,
    returnToTodosSelection: () => void,
    removeTodo: (idToDelete: string) => void,
    clearCompleted: () => void,
    updateLoginFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    updatePasswordFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    updateInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    updateTodoInputFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    updateSharedUsersFieldValue: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    addSharedUser: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  },
}

@observer
class App extends React.Component<Props> {
  // constructor(props) {
  //   super(props)
  //   this.store = props.store
  // }

  componentDidMount(): void {
    const { store: { fetchUsersData } } = this.props
    const login = localStorage.getItem('login')
    if (typeof login !== 'string') return
    fetchUsersData(login)
  }


  render(): React.Element<any> {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router history={store.history}>
          <InjectedModalWindow />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => (
                <InjectedLoginPanel />
              )}
            />
            <Route
              exact
              path="/signUp"
              render={() => <InjectedSignUpPanel />}
            />
            <InjectedPrivateRoute />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

const appStore = new Store()

ReactDOM.render(
  <App store={appStore} />, // $FlowIgnore
  document.getElementById('app'),
)
