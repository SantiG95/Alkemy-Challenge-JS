import express from "express"
import movementsController from "../controller/movementsController.js"

const router = express.Router()

router.get("/:id?", movementsController.getMovements)
router.post("/", movementsController.saveMovement)
router.put("/:id", movementsController.updateMovement)
router.delete("/:id", movementsController.eraseMovement)

export default router