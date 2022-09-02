import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

import { ToastifyConfig } from './config/ToastifyConfig'
import { AppRouter } from './router'
import { persistedStore, store } from './store'
import { blipchat } from './utils/blipchat'
import { logger } from './utils/logger'

function App() {
  logger.info('Starting App Component')

  React.useEffect(() => {
    blipchat()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ToastContainer {...ToastifyConfig} />
        <AppRouter />
      </PersistGate>
    </Provider>
  )
}

export { App }
