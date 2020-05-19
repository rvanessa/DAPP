import React from 'react'

import Providers from './context'
import Routes from './routes'

function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  )
}

export default App
