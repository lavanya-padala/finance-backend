const express = require("express");
const router = express.Router();
const controller = require("../controllers/recordController");

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

router.post("/", auth, authorize(["admin"]), controller.createRecord);

router.get("/", auth, authorize(["viewer", "analyst", "admin"]), controller.getRecords);

router.put("/:id", auth, authorize(["admin"]), controller.updateRecord);

router.delete("/:id", auth, authorize(["admin"]), controller.deleteRecord);

module.exports = router;