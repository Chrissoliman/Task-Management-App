import { Router } from "express";

import {
  createTask,
  getAllTasks,
  getCompletedTasks,
  completeIncompleteTask,
  getInCompletedTasks,
  getCategoryTasks,
  editTask,
  deleteTask,
} from "../controllers/task.controllers";
import { protectRoute } from "../middlewares/protectRoute";

const router = Router();

router.get("/all", protectRoute, getAllTasks);
router.get("/completed", protectRoute, getCompletedTasks);
router.get("/incompleted", protectRoute, getInCompletedTasks);
router.get("/:category", protectRoute, getCategoryTasks);
router.post("/complete/:id", protectRoute, completeIncompleteTask);
router.post("/create", protectRoute, createTask);
router.put("/edit/:id", protectRoute, editTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;
