import { wrapState } from './store'
import { joinSlices } from '@dwalter/spider-store'

export const [paused$, setPaused] = wrapState(true)

export const [currentTimes, setCurrentTime] = wrapState(0)

export const [elapsedTimes, setElapsedTime] = wrapState(0)

export const [startTimes, setStartTime] = wrapState(0)

export const stopwatchTimes = joinSlices(
  paused$,
  currentTimes,
  elapsedTimes,
  startTimes,
  (paused, currentTime, elapsedTime, startTime) => {
    if (paused) {
      return elapsedTime
    } else {
      return elapsedTime + currentTime - startTime
    }
  },
)
