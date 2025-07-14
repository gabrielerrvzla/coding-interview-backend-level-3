import { prisma } from '../../lib/prisma'
import { cleanDatabase, seedTestData } from '../../lib/test-utils'
import * as itemRepo from '../item.repository'

describe('Item Repository', () => {
    beforeEach(async () => {
        await cleanDatabase()
    })

    afterAll(async () => {
        await cleanDatabase()
        await prisma.$disconnect()
    })

    describe('findAll', () => {
        it('should return empty array when no items exist', async () => {
            const items = await itemRepo.findAll()
            expect(items).toEqual([])
        })

        it('should return all items when they exist', async () => {
            await seedTestData()
            const items = await itemRepo.findAll()
            expect(items).toHaveLength(3)
            expect(items[0]).toHaveProperty('id')
            expect(items[0]).toHaveProperty('name')
            expect(items[0]).toHaveProperty('price')
        })
    })

    describe('findById', () => {
        it('should return null when item does not exist', async () => {
            const item = await itemRepo.findById(999)
            expect(item).toBeNull()
        })

        it('should return item when it exists', async () => {
            const createdItem = await itemRepo.create({ name: 'Test Item', price: 10.50 })
            const foundItem = await itemRepo.findById(createdItem.id)
            expect(foundItem).toEqual(createdItem)
        })
    })

    describe('create', () => {
        it('should create a new item', async () => {
            const itemData = { name: 'New Item', price: 15.75 }
            const createdItem = await itemRepo.create(itemData)

            expect(createdItem).toHaveProperty('id')
            expect(createdItem.name).toBe(itemData.name)
            expect(createdItem.price).toBe(itemData.price)
        })
    })

    describe('update', () => {
        it('should update an existing item', async () => {
            const createdItem = await itemRepo.create({ name: 'Original Name', price: 10.00 })
            const updateData = { name: 'Updated Name', price: 20.00 }

            const updatedItem = await itemRepo.update(createdItem.id, updateData)

            expect(updatedItem).not.toBeNull()
            expect(updatedItem!.name).toBe(updateData.name)
            expect(updatedItem!.price).toBe(updateData.price)
        })

        it('should return null when item does not exist', async () => {
            const result = await itemRepo.update(999, { name: 'Test', price: 10.00 })
            expect(result).toBeNull()
        })
    })

    describe('remove', () => {
        it('should delete an existing item', async () => {
            const createdItem = await itemRepo.create({ name: 'To Delete', price: 10.00 })
            await itemRepo.remove(createdItem.id)

            const foundItem = await itemRepo.findById(createdItem.id)
            expect(foundItem).toBeNull()
        })

        it('should throw error when trying to delete non-existent item', async () => {
            await expect(itemRepo.remove(999)).rejects.toThrow()
        })
    })
}) 