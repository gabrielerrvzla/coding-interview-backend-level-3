import { prisma } from './prisma'
import logger from './logger'

export const cleanDatabase = async (): Promise<void> => {
    try {
        logger.debug('Cleaning database for tests')
        await prisma.item.deleteMany()
        logger.debug('Database cleaned successfully')
    } catch (error) {
        logger.error('Error cleaning database', { error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const seedTestData = async (): Promise<void> => {
    try {
        logger.debug('Seeding test data')
        await prisma.item.createMany({
            data: [
                { name: 'Test Item 1', price: 10.50 },
                { name: 'Test Item 2', price: 25.00 },
                { name: 'Test Item 3', price: 15.75 }
            ]
        })
        logger.debug('Test data seeded successfully')
    } catch (error) {
        logger.error('Error seeding test data', { error: error instanceof Error ? error.message : error })
        throw error
    }
} 