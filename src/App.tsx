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

export function App() {
  useSideEffect(animateStopwatch)

  const actions = useActions({
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
  })

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
