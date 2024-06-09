const logoutController = require('../../controllers/ath/logout');
const AthMidelware = require("../../midelwares/ath.md")
const router = require('express').Router();
router.use(AthMidelware.checkUser);
router.delete("/",logoutController.logout)

module.exports = router;