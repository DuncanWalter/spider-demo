import { createSettableState } from '@dwalter/spider-store'
import { createSelector, createSideEffect } from '@dwalter/spider-hook'

// =====================
// GENERATING REDUCERS & ACTION CREATORS
// =====================

/**
 * `createSettableState()` generates pairs of reducers
 * and specially optimized action creators for setting state.
 * The action creator behaves much like `setState()` in a
 * `react` component, but will also work with primitives and arrays.
 * `spider-store` cleanly handles using smaller slices of state
 * managed using setters. This pattern/tendency is by no
 * means implicitly superior or super battle tested, but
 * it is clean and simple (and it plays nice with typescript).
 */
const [stopwatch, setStopwatch] = createSettableState({
  paused: true,
  currentTime: 0,
  elapsedTime: 0,
  startTime: 0,
})

// =====================
// CREATING SELECTORS
// =====================

/**
 * `createSelector()` looks similar to `reselect`'s version
 * with a couple changes: 1) the function can accept reducers as sources
 * and 2) the value returned is not a function. Selectors are
 * instead consumed using a hook. The performance characteristics
 * of `spider-store` should be similar to aggressively using
 * `reselect`, though I have not done any serious benchmarking.
 */
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
// CREATING SIDE-EFFECTS
// =====================

/**
 * TODO: add a way to get an action stream,
 * as I believe this is the approach taken
 * by other libraries? Not sure yet.
 *
 * TODO: Perhaps allow side effects some way to run
 * without being attached to the dom? (see above)
 *
 * `createSideEffect()` creates an imperative
 * subscription to some slice or view of state.
 * Side effects are consumed using a hook which
 * guarantees that the effect is not active when
 * not used and ensures that the same side effect
 * is not running multiple instances at once.
 */
export const animateStopwatch = createSideEffect(
  getStopwatch,
  ({ paused }, dispatch) => {
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

/**
 * TODO: add logging information support to
 * user level actions for `redux-devtools`, etc.
 *
 * `spider-store` respects thunk and async actions out of the
 * box. Using generated setter actions moves action-specific
 * logic into the action creator. This has both pros and cons.
 * While very terse and discoverable, this leaves state
 * vulnerable to bugs caused by actions dispatched from
 * disparate points in an app's code. As a precaution,
 * I advise against exporting the generated setters.
 */
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
