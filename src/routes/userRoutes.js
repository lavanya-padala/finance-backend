const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/",controller.createUser);
router.put("/", auth,controller.updateUser);
router.delete("/", auth,controller.deleteUser);

module.exports = router;