import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'
import logger from './logger'

export interface ValidationError {
  field: string
  message: string
}

export interface ErrorResponse {
  errors: ValidationError[]
}

export const createValidationErrorResponse = (errors: ValidationError[]): ErrorResponse => ({
  errors
})

export const handleValidationError = (request: Request, h: ResponseToolkit, err: any) => {
  logger.warn('Validation error', {
    method: request.method,
    path: request.path,
    payload: request.payload,
    error: err.message
  })

  if (err.isJoi) {
    const errors: ValidationError[] = err.details.map((detail: any) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    
    // Devolver directamente la respuesta con el formato esperado
    return h.response({ errors }).code(400).takeover()
  }

  throw Boom.badRequest(err.message)
}

export const handleNotFoundError = (request: Request, h: ResponseToolkit, message: string = 'Resource not found') => {
  logger.warn('Not found error', {
    method: request.method,
    path: request.path,
    message
  })

  return h.response({ error: 'Not Found', message }).code(404)
}

export const handleInternalError = (request: Request, h: ResponseToolkit, error: Error) => {
  logger.error('Internal server error', {
    method: request.method,
    path: request.path,
    error: error.message,
    stack: error.stack
  })

  return h.response({ 
    error: 'Internal Server Error', 
    message: 'An unexpected error occurred' 
  }).code(500)
} 