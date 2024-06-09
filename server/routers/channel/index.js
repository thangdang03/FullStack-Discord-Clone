const ChannelController = require("../../controllers/channel");
const authMiddleware = require("../../midelwares/ath.md");
const router = require("express").Router();

router.post("/:id",authMiddleware.checked,ChannelController.CreateChannel);
router.get("",authMiddleware.checked,ChannelController.getChannelByServerId);
router.put("/:id",authMiddleware.checkRoles,ChannelController.editChannel);
router.delete("/:id",authMiddleware.checkRoles,ChannelController.deleteChannel);

module.exports = router;