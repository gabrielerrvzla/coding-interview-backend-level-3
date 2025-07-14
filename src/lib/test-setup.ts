import 'dotenv/config'
import { prisma } from './prisma'

beforeAll(async () => {
    process.env['NODE_ENV'] = 'test'
    process.env['LOG_LEVEL'] = 'error'
})

afterAll(async () => {
    await prisma.$disconnect()
})

beforeEach(async () => {
    await prisma.item.deleteMany()
})