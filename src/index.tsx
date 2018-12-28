import React from 'react'
import { render } from 'react-dom'
import { Stopwatch } from './StopWatch'
import { dispatch } from './store'
import { stopwatchTimes, startTimes, paused$ } from './slices'
import './effects'

import classNames from 'classnames'
import styles from './index.css'
import { startTimer, pauseTimer, resetTimer } from './actions'
const { row, root } = styles

render(
  <div className={classNames(row, root)}>
    <Stopwatch
      stopwatchTimes={stopwatchTimes}
      paused$={paused$}
      startTimes={startTimes}
      start={currentTime => dispatch(startTimer(currentTime))}
      stop={(startTime, currentTime) =>
        dispatch(pauseTimer(startTime, currentTime))
      }
      reset={() => dispatch(resetTimer())}
    />
  </div>,
  document.getElementById('anchor')!,
)
