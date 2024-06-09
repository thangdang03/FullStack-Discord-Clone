const router = require("express").Router();

const inviteController = require("../../controllers/server/invite");
const AthMidelware = require("../../midelwares/ath.md");

router.get("",AthMidelware.checked,inviteController.generateInvite);
router.get("/:id",inviteController.getInviteCode);

module.exports = router;