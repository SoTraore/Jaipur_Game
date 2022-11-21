import express from "express"

import healthRouter from "./healthRouter"
import gameRouter from "./gameRouter"
// import gameService from "../service/gameService"

// Don't forget to import new routers above

const router = express.Router()

router.use("/health", healthRouter)
// Add new routers above
router.use("/games", gameRouter)

export default router
