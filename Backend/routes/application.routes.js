const express = require("express");
const router = express.Router();
const {
  createApplication,
  fetchApplications,
  deleteApplications,
  updateApplication,
} = require("../controllers/application.controller");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, createApplication);
router.get("/fetch/:id", authenticateToken, fetchApplications);
router.put("/:id", authenticateToken, updateApplication);
router.delete("/", authenticateToken, deleteApplications);

module.exports = router;
