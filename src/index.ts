import 'dotenv/config'
import { startServer } from "./server"

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
    process.exit(1)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
    process.exit(1)
})

const main = async (): Promise<void> => {
    try {
        await startServer()
    } catch (error) {
        console.error('Error starting server:', error)
        process.exit(1)
    }
}

main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
})