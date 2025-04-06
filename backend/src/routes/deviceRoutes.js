const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/",authenticate, deviceController.getAllDevices);

router.get("/:id", authenticate, authorize("admin"),deviceController.getDeviceById);


module.exports = router;
