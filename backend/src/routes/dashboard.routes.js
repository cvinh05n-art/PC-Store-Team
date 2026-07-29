const express = require("express");

const dashboardController = require("../controllers/dashboard.controller");
const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/summary",
  auth,
  authorize("admin"),
  dashboardController.getDashboardSummary
);

module.exports = router;