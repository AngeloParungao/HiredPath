const express = require("express");
const { fetchNotification } = require("../controllers/notification.controller");
const router = express.Router();

router.get("/fetch/:id", fetchNotification);

module.exports = router;
