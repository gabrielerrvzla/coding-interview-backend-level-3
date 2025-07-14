import { Request, ResponseToolkit } from '@hapi/hapi'
import { handleInternalError, handleNotFoundError } from '../lib/error-handler'
import logger from '../lib/logger'
import * as service from '../services/item.service'

export const getItemsHandler = async (request: Request, h: ResponseToolkit) => {
    try {
        const result = await service.getItems(request.query)
        return h.response(result).code(200)
    } catch (error) {
        logger.error('Error getting items', { error: error instanceof Error ? error.message : error })
        return handleInternalError(request, h, error instanceof Error ? error : new Error('Unknown error'))
    }
}

export const getItemHandler = async (request: Request, h: ResponseToolkit) => {
    try {
        const id = parseInt(request.params['id'])
        const item = await service.getItem(id)
        if (!item) {
            return handleNotFoundError(request, h, 'Item not found')
        }
        return h.response(item).code(200)
    } catch (error) {
        logger.error('Error getting item', {
            id: request.params['id'],
            error: error instanceof Error ? error.message : error
        })
        return handleInternalError(request, h, error instanceof Error ? error : new Error('Unknown error'))
    }
}

export const createItemHandler = async (request: Request, h: ResponseToolkit) => {
    try {
        const payload = request.payload as any
        const item = await service.createItem(payload)
        return h.response(item).code(201)
    } catch (error) {
        logger.error('Error creating item', {
            payload: request.payload,
            error: error instanceof Error ? error.message : error
        })
        return handleInternalError(request, h, error instanceof Error ? error : new Error('Unknown error'))
    }
}

export const updateItemHandler = async (request: Request, h: ResponseToolkit) => {
    try {
        const id = parseInt(request.params['id'])
        const payload = request.payload as any
        const item = await service.updateItem(id, payload)
        if (!item) {
            return handleNotFoundError(request, h, 'Item not found')
        }
        return h.response(item).code(200)
    } catch (error) {
        logger.error('Error updating item', {
            id: request.params['id'],
            payload: request.payload,
            error: error instanceof Error ? error.message : error
        })
        return handleInternalError(request, h, error instanceof Error ? error : new Error('Unknown error'))
    }
}

export const deleteItemHandler = async (request: Request, h: ResponseToolkit) => {
    try {
        const id = parseInt(request.params['id'])
        await service.deleteItem(id)
        return h.response().code(204)
    } catch (error) {
        logger.error('Error deleting item', {
            id: request.params['id'],
            error: error instanceof Error ? error.message : error
        })
        return handleInternalError(request, h, error instanceof Error ? error : new Error('Unknown error'))
    }
}
