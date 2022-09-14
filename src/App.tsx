import * as React from "react"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import { PersistGate } from "redux-persist/integration/react"
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClientProvider } from "react-query"

import { ToastifyConfig } from "./config/ToastifyConfig"
import { AppRouter } from "./router"
import { persistedStore, store } from "./store"
import { blipchat } from "./utils/blipchat"
import { logger } from "./utils/logger"
import { queryClient } from "./utils/react-query"

import "react-toastify/dist/ReactToastify.min.css"

function App() {
  logger.info("Starting App Component")

  React.useEffect(() => {
    blipchat()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer {...ToastifyConfig} />
          <AppRouter />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export { App }
