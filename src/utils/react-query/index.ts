import { QueryClient, setLogger } from 'react-query'

import { logger } from '../logger'

const queryClient = new QueryClient()

setLogger({
  log: logger.log,
  warn: logger.warn,
  error: logger.error,
})

export { queryClient }
