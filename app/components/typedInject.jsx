// @flow
import * as React from 'react'
import { inject as untypedInject, Provider as UntypedProvider } from 'mobx-react'


type Store = $ReadOnly<{
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
}>;

type MakeMixed = <-V>(V) => mixed;

export function inject<
    TProps: {},
    TWrappedComponentType: React.ComponentType<TProps>,
    TInjectedProps: $Shape<
      & {...TProps}
      & TProps>,
  >(propsSelector: (Store) => TInjectedProps): (TWrappedComponentType) =>
  React.ComponentType<
    $Diff<
      $Exact<
        React.ElementConfig<TWrappedComponentType>>,
      $ObjMap<
        $Exact<TInjectedProps>,
        MakeMixed>>> {
  return (wrappedComponentType) => untypedInject(propsSelector)(wrappedComponentType)
}

export const Provider: React.ComponentType<Store> = UntypedProvider
