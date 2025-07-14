import { PrismaClient } from '@prisma/client'
import logger from './logger'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  logger.debug('Query', { 
    query: e.query, 
    params: e.params, 
    duration: e.duration 
  })
})

prisma.$on('error', (e) => {
  logger.error('Prisma error', { 
    target: e.target, 
    timestamp: e.timestamp 
  })
})

prisma.$on('info', (e) => {
  logger.info('Prisma info', { 
    message: e.message, 
    timestamp: e.timestamp 
  })
})

prisma.$on('warn', (e) => {
  logger.warn('Prisma warning', { 
    message: e.message, 
    timestamp: e.timestamp 
  })
})

export { prisma }