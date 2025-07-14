import { Server } from "@hapi/hapi"
import { registerHealthRoutes } from "./routes/health.route"
import { registerItemRoutes } from "./routes/item.route"

export const defineRoutes = (server: Server) => {
    registerHealthRoutes(server)
    registerItemRoutes(server)
}