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
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   content:
 *                     type: string
 *                   image:
 *                     type: string
 *                   link:
 *                     type: string
 *                   location:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   authorId:
 *                     type: integer
 */
router.get("/", getAllBlogsController);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     description: Retrieve a blog by its ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 */
router.get("/:id", getBlogByIdController);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog in the system
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               link:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.post(
  "/",
  // roleMiddleware(Role.ADMIN),
  // authMiddleware,
  upload.single("image"),
  createBlogController
);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     description: Update the details of an existing blog
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               link:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  upload.single("image"),
  updateBlogController
);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Delete a blog by its ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete(
  "/:id",
  // authMiddleware,
  // roleMiddleware(Role.ADMIN),
  deleteBlogController
);

export default router;
