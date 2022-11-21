import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import routes from "./routes"

// App creation
const app = express()

// Middlewares
app.use(helmet())
app.use(cors({ origin: "*" }))
app.use(morgan("short"))
app.use(bodyParser.json())
app.use(routes)

export default app
