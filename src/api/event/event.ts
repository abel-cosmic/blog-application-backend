import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { roleMiddleware } from "../../middleware/role";
import { Role } from "@prisma/client";
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
} from "../../controller/event";

const router = Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of events
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
 */
router.get("/", getAllEventsController);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     description: Retrieve an event by its ID
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEventByIdController);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event in the system
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  createEventController
);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     description: Update an event's details
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  updateEventController
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     description: Delete an event by its ID
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  deleteEventController
);

export default router;
