import { Server } from '@hapi/hapi'
import { healthCheckHandler } from '../controllers/health.controller'

export const registerHealthRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: healthCheckHandler
    })
}