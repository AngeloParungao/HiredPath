const express = require("express");
const {
  fetchNotification,
  updateNotificationRead,
} = require("../controllers/notification.controller");
const router = express.Router();

router.get("/fetch/:id", fetchNotification);
router.put("/:id", updateNotificationRead);

module.exports = router;
