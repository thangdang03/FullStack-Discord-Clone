const serverController = require('../../controllers/server');
const upload = require('../../helmet/mutler');
const AthMidelware = require('../../midelwares/ath.md');

const router = require('express').Router();

router.use(AthMidelware.checked);
// create server 
router.post("/",upload.single("image"), serverController.createServer);
// get list server by user 
router.get("",serverController.getServerById);
// update server 
router.put("/:id",upload.single("image"),serverController.updateServerById);
// delete server
router.delete("/:id",serverController.deleteServerById);

module.exports = router;