import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import displayAlert from '../utils/displayAlert'

interface Props {
  children: React.ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      refetchOnReconnect: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => displayAlert(error.response.data),
  }),
  mutationCache: new MutationCache({
    onSuccess: (data: any) => {
      if (data.alert) displayAlert(data.alert)
    },
  }),
})

export const ReactQueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
