import { Item } from '../../models/item.model'
import * as repo from '../../repositories/item.repository'
import * as service from '../item.service'

// Mock del repositorio
jest.mock('../../repositories/item.repository')
const mockedRepo = repo as jest.Mocked<typeof repo>

describe('Item Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getItems', () => {
        it('should return all items', async () => {
            const mockItems: Item[] = [
                { id: 1, name: 'Item 1', price: 10 },
                { id: 2, name: 'Item 2', price: 20 }
            ]
            mockedRepo.findAll.mockResolvedValue(mockItems)

            const result = await service.getItems()

            expect(result).toEqual(mockItems)
            expect(mockedRepo.findAll).toHaveBeenCalledTimes(1)
        })

        it('should throw error when repository fails', async () => {
            const error = new Error('Database error')
            mockedRepo.findAll.mockRejectedValue(error)

            await expect(service.getItems()).rejects.toThrow('Database error')
        })
    })

    describe('getItem', () => {
        it('should return item by id', async () => {
            const mockItem: Item = { id: 1, name: 'Item 1', price: 10 }
            mockedRepo.findById.mockResolvedValue(mockItem)

            const result = await service.getItem(1)

            expect(result).toEqual(mockItem)
            expect(mockedRepo.findById).toHaveBeenCalledWith(1)
        })

        it('should return null when item not found', async () => {
            mockedRepo.findById.mockResolvedValue(null)

            const result = await service.getItem(999)

            expect(result).toBeNull()
            expect(mockedRepo.findById).toHaveBeenCalledWith(999)
        })

        it('should throw error when repository fails', async () => {
            const error = new Error('Database error')
            mockedRepo.findById.mockRejectedValue(error)

            await expect(service.getItem(1)).rejects.toThrow('Database error')
        })
    })

    describe('createItem', () => {
        it('should create new item', async () => {
            const itemData = { name: 'New Item', price: 15 }
            const createdItem: Item = { id: 1, ...itemData }
            mockedRepo.create.mockResolvedValue(createdItem)

            const result = await service.createItem(itemData)

            expect(result).toEqual(createdItem)
            expect(mockedRepo.create).toHaveBeenCalledWith(itemData)
        })

        it('should throw error when repository fails', async () => {
            const error = new Error('Database error')
            mockedRepo.create.mockRejectedValue(error)

            await expect(service.createItem({ name: 'Item', price: 10 })).rejects.toThrow('Database error')
        })
    })

    describe('updateItem', () => {
        it('should update existing item', async () => {
            const updateData = { name: 'Updated Item', price: 25 }
            const updatedItem: Item = { id: 1, ...updateData }
            mockedRepo.update.mockResolvedValue(updatedItem)

            const result = await service.updateItem(1, updateData)

            expect(result).toEqual(updatedItem)
            expect(mockedRepo.update).toHaveBeenCalledWith(1, updateData)
        })

        it('should return null when item not found', async () => {
            mockedRepo.update.mockResolvedValue(null)

            const result = await service.updateItem(999, { name: 'Item', price: 10 })

            expect(result).toBeNull()
            expect(mockedRepo.update).toHaveBeenCalledWith(999, { name: 'Item', price: 10 })
        })

        it('should throw error when repository fails', async () => {
            const error = new Error('Database error')
            mockedRepo.update.mockRejectedValue(error)

            await expect(service.updateItem(1, { name: 'Item', price: 10 })).rejects.toThrow('Database error')
        })
    })

    describe('deleteItem', () => {
        it('should delete item', async () => {
            mockedRepo.remove.mockResolvedValue(undefined)

            await service.deleteItem(1)

            expect(mockedRepo.remove).toHaveBeenCalledWith(1)
        })

        it('should throw error when repository fails', async () => {
            const error = new Error('Database error')
            mockedRepo.remove.mockRejectedValue(error)

            await expect(service.deleteItem(1)).rejects.toThrow('Database error')
        })
    })
}) 