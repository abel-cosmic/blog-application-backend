import { Router } from "express";
import {
  createSubscriptionController,
  getSubscriptionByEmailController,
  deleteSubscriptionController,
  getAllSubscriptionsController,
} from "../../controller/subscription";

const router = Router();

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     description: Retrieve a list of all subscriptions
 *     tags:
 *       - Subscriptions
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", getAllSubscriptionsController);

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     description: Create a new subscription with the provided email
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscription created
 *       400:
 *         description: Subscription already exists or invalid data
 */
router.post("/", createSubscriptionController);

/**
 * @swagger
 * /subscriptions/{email}:
 *   get:
 *     summary: Get a subscription by email
 *     description: Retrieve a subscription by its email
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email of the subscription to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription details
 *       404:
 *         description: Subscription not found
 */
router.get("/:email", getSubscriptionByEmailController);

/**
 * @swagger
 * /subscriptions/{email}:
 *   delete:
 *     summary: Delete a subscription by email
 *     description: Delete a subscription based on the provided email
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email of the subscription to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription deleted
 *       404:
 *         description: Subscription not found
 */
router.delete("/:email", deleteSubscriptionController);

export default router;
