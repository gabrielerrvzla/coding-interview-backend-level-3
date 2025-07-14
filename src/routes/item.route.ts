import { Server } from '@hapi/hapi'
import Joi from 'joi'
import { createItemHandler, deleteItemHandler, getItemHandler, getItemsHandler, updateItemHandler } from '../controllers/item.controller'
import { itemSchema } from '../schemas/item.schema'

export const registerItemRoutes = (server: Server) => {
    server.route([
        {
            method: 'GET',
            path: '/items',
            handler: getItemsHandler,
            options: {
                validate: {
                    query: Joi.object({
                        name: Joi.string().optional(),
                        minPrice: Joi.number().optional(),
                        maxPrice: Joi.number().optional()
                    })
                }
            }
        },
        {
            method: 'GET',
            path: '/items/{id}',
            handler: getItemHandler,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.number().required()
                    })
                }
            }
        },
        {
            method: 'POST',
            path: '/items',
            options: {
                validate: {
                    payload: itemSchema
                }
            },
            handler: createItemHandler
        },
        {
            method: 'PUT',
            path: '/items/{id}',
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.number().required()
                    }),
                    payload: itemSchema
                }
            },
            handler: updateItemHandler
        },
        {
            method: 'DELETE',
            path: '/items/{id}',
            handler: deleteItemHandler,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.number().required()
                    })
                }
            }
        }
    ])
}
