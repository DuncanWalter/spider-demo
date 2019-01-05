import React from 'react'
import { render } from 'react-dom'

import { SpiderRoot } from '@dwalter/spider-hook'
import { App } from './App'

render(
  <SpiderRoot>
    <App />
  </SpiderRoot>,
  document.getElementById('anchor')!,
)
