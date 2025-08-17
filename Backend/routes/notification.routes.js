const express = require("express");
const {
  fetchNotification,
  updateNotificationRead,
} = require("../controllers/notification.controller");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/fetch/:id", authenticateToken, fetchNotification);
router.put("/:id", authenticateToken, updateNotificationRead);

module.exports = router;
