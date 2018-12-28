import {
  setPaused,
  setStartTime,
  setCurrentTime,
  setElapsedTime,
} from './slices'
import { Dispatch } from '@dwalter/spider-store'
import { Action } from './store'

export function startTimer(currentTime: number) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(setPaused(false))
    dispatch(setStartTime(currentTime))
    dispatch(setCurrentTime(currentTime))
  }
}

export function pauseTimer(startTime: number, currentTime: number) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(setPaused(true))
    dispatch(
      setElapsedTime(elapsedTime => elapsedTime + currentTime - startTime),
    )
  }
}

export function resetTimer() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(setPaused(true))
    dispatch(setElapsedTime(0))
  }
}
