const router = require('express').Router();
const registerController = require("../../controllers/ath/register.ct");

router.post("",registerController.register);


module.exports = router;