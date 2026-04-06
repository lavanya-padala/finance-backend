
const express = require("express");
const router = express.Router();
const controller = require("../controllers/summaryController");
const authorize = require("../middlewares/authorize");
const auth = require("../middlewares/auth");

router.get("/category", auth, authorize(["analyst", "admin"]), controller.getCategoryTotals);

router.get("/recent", auth,authorize(["analyst", "admin"]), controller.getRecentActivity);

router.get("/monthly", auth,authorize(["analyst", "admin"]), controller.getMonthlyTrends);

router.get("/weekly", auth,authorize(["analyst", "admin"]), controller.getWeeklyTrends);

router.get("/", auth,authorize(["analyst", "admin"]), controller.getSummary);


module.exports = router;