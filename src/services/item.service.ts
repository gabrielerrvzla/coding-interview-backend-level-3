import logger from '../lib/logger'
import { Item, SearchFilters } from '../models/item.model'
import * as repo from '../repositories/item.repository'

export const getItems = async (filters?: SearchFilters): Promise<Item[]> => {
    try {
        return await repo.findAll(filters)
    } catch (error) {
        logger.error('Service: Error getting items', { error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const getItem = async (id: number): Promise<Item | null> => {
    try {
        return await repo.findById(id)
    } catch (error) {
        logger.error('Service: Error getting item', { id, error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const createItem = async (data: Omit<Item, 'id'>): Promise<Item> => {
    try {
        return await repo.create(data)
    } catch (error) {
        logger.error('Service: Error creating item', { data, error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const updateItem = async (id: number, data: Omit<Item, 'id'>): Promise<Item | null> => {
    try {
        return await repo.update(id, data)
    } catch (error) {
        logger.error('Service: Error updating item', { id, data, error: error instanceof Error ? error.message : error })
        throw error
    }
}

export const deleteItem = async (id: number): Promise<void> => {
    try {
        await repo.remove(id)
    } catch (error) {
        logger.error('Service: Error deleting item', { id, error: error instanceof Error ? error.message : error })
        throw error
    }
}
