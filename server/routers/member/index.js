const memberController = require('../../controllers/member');
const AthMidelware = require('../../midelwares/ath.md');
const router = require('express').Router();

router.use(AthMidelware.checked);
// get list member in server id
router.get("",memberController.getListMember);

// kick member form server 
router.delete("",AthMidelware.checkRoles,memberController.kickMember);

// remove by id member in server
router.delete("/:id",memberController.LeaverServer)

// authorization member
router.put("/:id",AthMidelware.checkRoles,memberController.authenticationRoles)


module.exports = router;