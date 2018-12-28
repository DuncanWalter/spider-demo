import { paused$, currentTimes, setCurrentTime } from './slices'
import { joinSlices } from '@dwalter/spider-store'
import { dispatch } from './store'

joinSlices(
  currentTimes,
  paused$,
  (currentTime, paused) => (paused ? 'paused' : currentTime),
).subscribe(time => {
  if (time !== 'paused') {
    requestAnimationFrame(() => {
      const now = Date.now()
      dispatch(setCurrentTime(now))
    })
  }
})
