import * as React from 'react'
import { useActions, useStoreState, useSideEffect } from '@dwalter/spider-hook'
import classNames from 'classnames'

import {
  getStopwatch,
  animateStopwatch,
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
} from './store'
import { Stopwatch } from './Stopwatch'
import styles from './index.css'
const { row, root } = styles

/**
 * In this abbreviated application structure,
 * this component serves as both the app root and
 * as a container component. In reality, a more
 * traditional `react` architecture would
 * be superior. It may be desireable to NOT hoist state
 * quite as much when using `spider-store` to
 * reap maximal performance and readability rewards,
 * but that is an untested hypothesis.
 */
export function App() {
  useSideEffect(animateStopwatch)

  // action binding is handled behind the scenes
  const actions = useActions({
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
  })

  // subscription logic and component rerenders
  // are handled inside of a hook as well
  const { paused, time } = useStoreState(getStopwatch)

  return (
    <div className={classNames(row, root)}>
      <Stopwatch
        stopwatchTime={time}
        paused={paused}
        start={actions.startStopwatch}
        stop={() => actions.pauseStopwatch(time)}
        reset={actions.resetStopwatch}
      />
    </div>
  )
}
