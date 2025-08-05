const express = require("express");
const router = express.Router();
const {
  createApplication,
  fetchApplications,
} = require("../controllers/application.controller");

router.post("/create", createApplication);
router.get("/fetch/:id", fetchApplications);

module.exports = router;
