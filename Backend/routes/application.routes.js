const express = require("express");
const multer = require("multer");
const {
  createApplication,
  fetchApplications,
  deleteApplications,
  updateApplication,
} = require("../controllers/application.controller");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  upload.single("file"),
  authenticateToken,
  createApplication
);
router.get("/fetch/:id", authenticateToken, fetchApplications);
router.put("/:id", authenticateToken, updateApplication);
router.delete("/", authenticateToken, deleteApplications);

module.exports = router;
