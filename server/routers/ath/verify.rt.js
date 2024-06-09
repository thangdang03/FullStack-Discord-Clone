const router = require('express').Router();
const verifyController = require("../../controllers/ath/verify");
router.get("/:token",verifyController.verifyEmail);


module.exports = router;