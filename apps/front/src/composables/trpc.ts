import { type CreateTRPCProxyClient, createTRPCProxyClient, createWSClient, httpBatchLink, wsLink } from '@trpc/client'
import type { AppRouter } from '@agenda/back/src/index'

const client: CreateTRPCProxyClient<AppRouter> = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2022'
    }),
    wsLink({
      client: createWSClient({
        url: `ws://localhost:2022`,
      }),
    }),
  ]
})

export function useTrpcClient (): CreateTRPCProxyClient<AppRouter> {
  return client
}
