import { createSettableState } from '@dwalter/spider-store'
import { createSelector, createSideEffect } from '@dwalter/spider-hook'

// =====================
// GENERATE A REDUCER AND SETTER ACTION CREATOR
// =====================

// reducers are typically NOT exported (selectors
// and hooks may be exported)
const [stopwatch, setStopwatch] = createSettableState({
  paused: true,
  currentTime: 0,
  elapsedTime: 0,
  startTime: 0,
})

// =====================
// USE SELECTORS TO CREATE MORE USEFUL STATE
// =====================

const getDisplayTime = createSelector(
  [stopwatch],
  ({ paused, currentTime, elapsedTime, startTime }) => {
    if (paused) {
      return elapsedTime
    } else {
      return elapsedTime + currentTime - startTime
    }
  },
)

export const getStopwatch = createSelector(
  [stopwatch, getDisplayTime],
  ({ paused }, time) => {
    return { time, paused }
  },
)

// =====================
// SET UP A SIDE EFFECT TO UPDATE THE STOPWATCH EACH FRAME
// =====================

// TODO: use a mutex style lock to keep to one instance of a side effect
// running at a time
export const animateStopwatch = createSideEffect(
  getStopwatch,
  ({ time, paused }, dispatch) => {
    if (!paused) {
      requestAnimationFrame(() => {
        dispatch(setStopwatch({ currentTime: Date.now() }))
      })
    }
  },
)

// =====================
// CREATE HIGH LEVEL ACTIONS
// =====================

export function startStopwatch(currentTime: number) {
  return setStopwatch({
    paused: false,
    startTime: currentTime,
    currentTime,
  })
}

export function pauseStopwatch(stopwatchTime: number) {
  return setStopwatch({
    paused: true,
    elapsedTime: stopwatchTime,
  })
}

export function resetStopwatch() {
  return setStopwatch({
    paused: true,
    elapsedTime: 0,
  })
}
