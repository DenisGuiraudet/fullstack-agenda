import {
  type CreateTRPCProxyClient,
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink
} from '@trpc/client'
import type { AppRouter } from '@agenda/back/index'

let client: CreateTRPCProxyClient<AppRouter>

function initClient() {
  if (client) return

  const wsClient = createWSClient({
    url: `ws://localhost:2022`,
  });

  client = createTRPCProxyClient<AppRouter>({
    links: [
      // call subscriptions through websockets and the rest over http
      splitLink({
        condition (op) {
          return op.type === 'subscription';
        },
        true: wsLink({
          client: wsClient,
        }),
        false: httpBatchLink({
          url: `http://localhost:2022`,
        }),
      }),
    ]
  })
}

export function useTrpcClient(): CreateTRPCProxyClient<AppRouter> {
  initClient()
  return client
}
