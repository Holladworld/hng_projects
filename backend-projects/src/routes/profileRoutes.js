const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get user profile with dynamic cat fact
 *     description: Returns user profile information along with a random cat fact
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     stack:
 *                       type: string
 *                       example: Node.js/Express
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-15T10:30:45.123Z
 *                 fact:
 *                   type: string
 *                   example: Cats can jump up to 6 times their length.
 */
router.get('/me', profileController.getProfile.bind(profileController));

module.exports = router;