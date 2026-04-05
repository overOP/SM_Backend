import { Router } from "express";
import { ParentController } from "../controllers/parent.controller";

const router = Router();

router.post("/", ParentController.createParent);
router.get("/", ParentController.getAllParents);
router.get("/:id/children", ParentController.getParentWithChildren);
router.get("/:id", ParentController.getParentById);
router.put("/:id", ParentController.updateParent);
router.delete("/:id", ParentController.deleteParent);

export default router;
