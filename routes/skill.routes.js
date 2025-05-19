import { Router } from "express";
import { getAllSkill, getSkill, createSkill, updateSkill, deleteSkill } from "../controllers/skill.controllers.js";
import { authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllSkill);
router.get("/:skillId", getSkill);
router.post("/", authorize, createSkill);
router.put("/:skillId", authorize, updateSkill);
router.delete("/:skillId", authorize, deleteSkill);

export default router;

