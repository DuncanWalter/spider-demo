import React from 'react'
import { render } from 'react-dom'

import { SpiderRoot } from '@dwalter/spider-hook'
import { App } from './App'

/**
 * The `SpiderRoot` provides a singleton store to its
 * descendants in a way matching `react-redux`. This
 * should allow for things like server side rendering
 * as well, though I'm not well versed in that topic at all.
 * The store used can be configured with a `configureStore()`
 * prop which defaults to using a vanilla store.
 */
render(
  <SpiderRoot>
    <App />
  </SpiderRoot>,
  document.getElementById('anchor')!,
)
