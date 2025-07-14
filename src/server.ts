import Hapi from '@hapi/hapi'
import Joi from 'joi'
import { CORS_ORIGIN, HOST, NODE_ENV, PORT } from './lib/constants'
import { handleValidationError } from './lib/error-handler'
import logger from './lib/logger'
import { defineRoutes } from './routes'

const SERVER_CONFIG = {
    host: HOST,
    port: PORT,
    routes: {
        cors: {
            origin: [CORS_ORIGIN],
            credentials: true
        },
        validate: {
            failAction: handleValidationError
        }
    }
}

const getServer = (): Hapi.Server => {
    const server = Hapi.server(SERVER_CONFIG)

    server.validator(Joi)

    defineRoutes(server)

    server.events.on('log', (event, tags) => {
        if (tags['error']) {
            const error = event.error as Error | undefined
            logger.error('Server error', {
                error: error?.message,
                stack: error?.stack,
                tags
            })
        } else if (tags['info']) {
            logger.info('Server info', { message: event.data, tags })
        }
    })

    server.events.on('request', (request, event, tags) => {
        if (tags['error']) {
            const error = event.error as Error | undefined
            logger.error('Request error', {
                method: request.method,
                path: request.path,
                error: error?.message,
                stack: error?.stack
            })
        }
    })

    return server
}

export const initializeServer = async (): Promise<Hapi.Server> => {
    try {
        const server = getServer()
        await server.initialize()
        logger.info('Server initialized successfully', {
            host: server.info.host,
            port: server.info.port
        })
        return server
    } catch (error) {
        logger.error('Failed to initialize server', {
            error: error instanceof Error ? error.message : error
        })
        throw error
    }
}

export const startServer = async (): Promise<Hapi.Server> => {
    try {
        const server = getServer()
        await server.start()
        logger.info('Server started successfully', {
            uri: server.info.uri,
            environment: NODE_ENV || 'development'
        })
        return server
    } catch (error) {
        logger.error('Failed to start server', {
            error: error instanceof Error ? error.message : error
        })
        throw error
    }
}
