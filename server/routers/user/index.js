const userController = require('../../controllers/user');
const AthMidelware = require('../../midelwares/ath.md');
const upload = require('../../helmet/mutler');
const router = require('express').Router();
router.use(AthMidelware.checkUser);
router.get("/:id",userController.getUserById);
router.put("",upload.single("image"), userController.updateUser);
module.exports = router;