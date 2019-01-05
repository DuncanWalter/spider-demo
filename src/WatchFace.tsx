import * as React from 'react'
import styles from './index.css'
import classNames from 'classnames'

interface WatchFaceProps {
  stopwatchTime: number
  paused: boolean
  children: any
}

export function WatchFace({ stopwatchTime, paused, children }: WatchFaceProps) {
  return (
    <div>
      <Ball
        paused={paused}
        style={styles.bigBall}
        radians={toRadians(stopwatchTime / 1100)}
      />
      <Ball
        paused={paused}
        style={styles.smallBall}
        radians={toRadians(stopwatchTime / 2760)}
      />
      <Ball
        paused={paused}
        style={styles.mediumBall}
        radians={toRadians(stopwatchTime / 1750)}
      />
      <div className={styles.centerPoint}>
        <div className={styles.watchFace}>{children}</div>
      </div>
    </div>
  )
}

interface BallProps {
  style: string
  radians: number
  paused: boolean
}

function Ball({ style, radians, paused }: BallProps) {
  return (
    <div
      className={classNames(
        styles.centerPoint,
        paused ? styles.animated : null,
      )}
      style={{ transform: `rotate(${radians}rad)` }}
    >
      <div className={style} />
    </div>
  )
}

function toRadians(n: number) {
  return ((n + Math.PI) % (2 * Math.PI)) - Math.PI
}
