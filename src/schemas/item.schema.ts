import Joi from 'joi'

export const itemSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'Field "name" cannot be empty',
        'string.min': 'Field "name" must have at least 1 character',
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Field "price" must be a number',
        'number.min': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
})

export const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 1'
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least 1',
        'number.max': 'Limit cannot exceed 100'
    })
})

export const searchFiltersSchema = Joi.object({
    name: Joi.string().min(1).optional().messages({
        'string.empty': 'Search name cannot be empty',
        'string.min': 'Search name must have at least 1 character'
    }),
    minPrice: Joi.number().min(0).optional().messages({
        'number.base': 'Min price must be a number',
        'number.min': 'Min price cannot be negative'
    }),
    maxPrice: Joi.number().min(0).optional().messages({
        'number.base': 'Max price must be a number',
        'number.min': 'Max price cannot be negative'
    })
}).custom((value, helpers) => {
    if (value.minPrice !== undefined && value.maxPrice !== undefined) {
        if (value.maxPrice < value.minPrice) {
            return helpers.error('any.invalid', { message: 'Max price must be greater than or equal to min price' })
        }
    }
    return value
})