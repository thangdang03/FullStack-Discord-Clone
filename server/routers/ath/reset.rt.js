const router = require('express').Router();
const resetController = require("../../controllers/ath/reset.ct");
router.post("",resetController.sendTokenReset);
router.post("/:token",resetController.verifyPassword);


module.exports = router;