import * as React from 'react'
import { Slice } from '@dwalter/spider-store'
import { useSlice } from '@dwalter/spider-hook'
import styles from './index.css'
import watchStyles from './WatchFace.css'
import classNames from 'classnames'

interface WatchFaceProps {
  stopwatchTimes: Slice<number>
  paused$: Slice<boolean>
  children: any
}

export function WatchFace({
  stopwatchTimes,
  paused$,
  children,
}: WatchFaceProps) {
  const milliseconds = useSlice(stopwatchTimes)
  const paused = useSlice(paused$)
  return (
    <div>
      <div
        className={classNames(
          styles.centerPoint,
          paused ? styles.animated : null,
        )}
        style={{ transform: `rotate(${toRadians(milliseconds / 1100)}rad)` }}
      >
        <div className={watchStyles.bigBall} />
      </div>
      <div
        className={classNames(
          styles.centerPoint,
          paused ? styles.animated : null,
        )}
        style={{ transform: `rotate(${toRadians(milliseconds / 1750)}rad)` }}
      >
        <div className={watchStyles.mediumBall} />
      </div>
      <div
        className={classNames(
          styles.centerPoint,
          paused ? styles.animated : null,
        )}
        style={{ transform: `rotate(${toRadians(milliseconds / 2760)}rad)` }}
      >
        <div className={watchStyles.smallBall} />
      </div>
      <div className={styles.centerPoint}>
        <div className={styles.watchFace}>{children}</div>
      </div>
    </div>
  )
}

function toRadians(n: number) {
  return ((n + Math.PI) % (2 * Math.PI)) - Math.PI
}
