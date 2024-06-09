const router = require('express').Router();
const handelTokenController = require('../../controllers/ath/handel.token');
const hadleMidel = require("../../midelwares/ath.md");

router.get('/',hadleMidel.checkUser,handelTokenController.GetNewToken);

module.exports = router;