import { Router } from "express";
import {
  createRegistrationController,
  deleteRegistrationController,
  getAllRegistrationsController,
  getRegistrationByIdController,
  getRegistrationByUserIdAndEventIdController,
  updateRegistrationController,
} from "../../controller/registration";
import { authMiddleware } from "../../middleware/auth";
import { roleMiddleware } from "../../middleware/role";
const router = Router();

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Create a new registration
 *     tags: [Registration]
 *     requestBody:
 *       description: Registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Registration created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createRegistrationController
);

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Get a registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registration details
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getRegistrationByIdController);

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Get all registrations
 *     tags: [Registration]
 *     responses:
 *       200:
 *         description: List of all registrations
 *       500:
 *         description: Server error
 */
router.get("/", getAllRegistrationsController);

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Update a registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Registration details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateRegistrationController
);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registration by ID
 *     tags: [Registration]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteRegistrationController
);

/**
 * @swagger
 * /registrations/user/{userId}/event/{eventId}:
 *   get:
 *     summary: Get a registration by User ID and Event ID
 *     tags: [Registration]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registration details
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.get(
  "/user/:userId/event/:eventId",
  getRegistrationByUserIdAndEventIdController
);

export default router;
