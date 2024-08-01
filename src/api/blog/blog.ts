// blogRoutes.ts
import { Router } from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
} from "../../controller/blog";
import { upload } from "../../config/multer";
import { authMiddleware } from "../../middleware/auth";
import { roleMiddleware } from "../../middleware/role";

const router = Router();

// Public routes
router.get("/", getAllBlogsController);
router.get("/:id", getBlogByIdController);

// Protected routes
router.post(
  "/",
  roleMiddleware("ADMIN"),
  authMiddleware,
  upload.single("image"),
  createBlogController
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  upload.single("image"),
  updateBlogController
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteBlogController
);

export default router;
