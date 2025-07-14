import { Request, ResponseToolkit } from '@hapi/hapi'

export const healthCheckHandler = async (_: Request, h: ResponseToolkit) => {
    return h.response({ ok: true }).code(200)
}