import { initTRPC } from '@trpc/server'
import { CreateHTTPContextOptions, createHTTPServer } from '@trpc/server/adapters/standalone'
import { applyWSSHandler, CreateWSSContextFnOptions } from '@trpc/server/adapters/ws'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import { calendarRouter } from './src/routes/calendar'

// This is how you initialize a context for the server
function createContext(opts: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  return {}
}
type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

export type T = typeof t

// Merge routers together
const appRouter = t.router({
  calendar: calendarRouter(t)
})

export type AppRouter = typeof appRouter

// http server
const { server, listen } = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext
})

// ws server
const wss = new WebSocketServer({ server })
const wssHandler = applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext
})

setInterval(() => {
  console.log('Connected clients', wss.clients.size)
}, 10000)

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

listen(2022)

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  wssHandler.broadcastReconnectNotification();
  wss.close();
  server.close();
});
