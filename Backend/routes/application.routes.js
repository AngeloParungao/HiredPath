const express = require("express");
const router = express.Router();
const {
  createApplication,
  fetchApplications,
  deleteApplications,
  updateApplication,
} = require("../controllers/application.controller");

router.post("/create", createApplication);
router.get("/fetch/:id", fetchApplications);
router.put("/:id", updateApplication);
router.delete("/", deleteApplications);

module.exports = router;
