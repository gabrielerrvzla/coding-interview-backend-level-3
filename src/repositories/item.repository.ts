import { Prisma } from '@prisma/client'
import logger from '../lib/logger'
import { prisma } from '../lib/prisma'
import { Item, SearchFilters } from '../models/item.model'

export const findAll = async (filters?: SearchFilters): Promise<Item[]> => {
    try {
        return await prisma.item.findMany({
            where: {
                ...(filters?.name && { name: { contains: filters.name } }),
                ...(filters?.minPrice && { price: { gte: filters.minPrice } }),
                ...(filters?.maxPrice && { price: { lte: filters.maxPrice } })
            }
        })
    } catch (error) {
        logger.error('Repository: Error finding all items', { error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const findById = async (id: number): Promise<Item | null> => {
    try {
        return await prisma.item.findUnique({ where: { id } })
    } catch (error) {
        logger.error('Repository: Error finding item by id', { id, error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const create = async (data: Omit<Item, 'id'>): Promise<Item> => {
    try {
        return await prisma.item.create({ data })
    } catch (error) {
        logger.error('Repository: Error creating item', { data, error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const update = async (id: number, data: Omit<Item, 'id'>): Promise<Item | null> => {
    try {
        return await prisma.item.update({ where: { id }, data })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            logger.warn('Repository: Item not found for update', { id })
            return null
        }
        logger.error('Repository: Error updating item', { id, data, error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const remove = async (id: number): Promise<void> => {
    try {
        await prisma.item.delete({ where: { id } })
    } catch (error) {
        logger.error('Repository: Error deleting item', { id, error: error instanceof Error ? error.message : error })
        throw error
    }
}
