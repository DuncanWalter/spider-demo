import { createStore, Slice } from '@dwalter/spider-store'
import { Dispatch } from '@dwalter/spider-store/src/createStore'

interface SetState<State = unknown> {
  type: '@store/set-state'
  target: Slice<State>
  newState: State | ((state: State) => State)
}

export type Action = SetState<any>

export const { dispatch, wrapReducer } = createStore<Action>()

export function wrapState<State>(
  initialState: State,
): [
  Slice<State>,
  (
    newState: State | ((state: State) => State),
  ) => (dispatch: Dispatch<Action>) => unknown
] {
  const slice = wrapReducer<State>((state = initialState, action: Action) => {
    if (action.type === '@store/set-state') {
      if (action.target === slice) {
        if (typeof action.newState === 'function') {
          return action.newState(state)
        } else {
          return action.newState
        }
      }
    }
    return state
  })

  function setState(newState: State | ((state: State) => State)) {
    return (dispatcher: Dispatch<Action>) =>
      dispatcher({ type: '@store/set-state', target: slice, newState })
  }

  return [slice, setState]
}
