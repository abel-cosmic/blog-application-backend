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

const router = Router();

router.get("/", getAllBlogsController);
router.get("/:id", getBlogByIdController);
router.post("/", upload.single("image"), createBlogController);
router.put("/:id", upload.single("image"), updateBlogController);
router.delete("/:id", deleteBlogController);

export default router;
