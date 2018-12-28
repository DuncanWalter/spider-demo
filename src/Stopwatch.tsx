import React from 'react'
import { joinSlices, Slice } from '@dwalter/spider-store'
import { map } from '@dwalter/spider-operations'

import styles from './index.css'
import { WatchFace } from './WatchFace'
import { useSlice } from '@dwalter/spider-hook'

interface StopwatchProps {
  stopwatchTimes: Slice<number>
  paused$: Slice<boolean>
  startTimes: Slice<number>
  start: (currentTime: number) => unknown
  stop: (startTime: number, currentTime: number) => unknown
  reset: () => unknown
}

export function Stopwatch({
  stopwatchTimes,
  paused$,
  startTimes,
  start,
  stop,
  reset,
}: StopwatchProps) {
  const displayTime = useSlice(() => displayTimes(stopwatchTimes))
  const startTime = useSlice(startTimes)
  const paused = useSlice(paused$)

  return (
    <div className={styles.col}>
      <WatchFace stopwatchTimes={stopwatchTimes} paused$={paused$}>
        <h1>{displayTime}</h1>
        <div className={styles.row}>
          {paused ? (
            <button onClick={() => start(Date.now())}>Start</button>
          ) : (
            <button onClick={() => stop(startTime, Date.now())}>Stop</button>
          )}
          {paused ? <button onClick={() => reset()}>Reset</button> : undefined}
        </div>
      </WatchFace>
    </div>
  )
}

const second = 1000
const minute = second * 60
const hour = minute * 60

function displayTimes(stopwatchTimes: Slice<number>): Slice<string> {
  const seconds = stopwatchTimes
    .use(map)
    .map(time => (time % minute) / second)
    .map(number => number.toFixed(2))
    .map(string => string.padStart(5, '0'))

  const minutes = stopwatchTimes
    .use(map)
    .map(time => (time % hour) / minute)
    .map(number => number.toFixed(0))
    .map(string => string.padStart(2, '0'))

  return joinSlices(seconds, minutes, (s, m) => `${m}:${s}`)
}
