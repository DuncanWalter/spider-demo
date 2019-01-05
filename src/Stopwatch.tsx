import React from 'react'

import styles from './index.css'
import { WatchFace } from './WatchFace'

interface StopwatchProps {
  stopwatchTime: number
  paused: boolean
  start: (currentTime: number) => unknown
  stop: () => unknown
  reset: () => unknown
}

const second = 1000
const minute = second * 60
const hour = minute * 60

export function Stopwatch({
  stopwatchTime,
  paused,
  start,
  stop,
  reset,
}: StopwatchProps) {
  return (
    <div className={styles.col}>
      <WatchFace stopwatchTime={stopwatchTime} paused={paused}>
        <h1>{displayTime(stopwatchTime)}</h1>
        <div className={styles.row}>
          {paused ? (
            <button onClick={() => start(Date.now())}>Start</button>
          ) : (
            <button onClick={stop}>Stop</button>
          )}
          {paused ? <button onClick={reset}>Reset</button> : undefined}
        </div>
      </WatchFace>
    </div>
  )
}

function displayTime(milliseconds: number): string {
  const seconds = (milliseconds % minute) / second
  const secondsDisplay = seconds.toFixed(2).padStart(5, '0')

  const minutes = (milliseconds % hour) / minute
  const minutesDisplay = minutes.toFixed(0).padStart(2, '0')

  return `${minutesDisplay}:${secondsDisplay}`
}
