const router = require("express").Router();
const messageController = require("../../controllers/message");
const multer = require("../../helmet/mutler");
const authMiddleware = require("../../midelwares/ath.md")

router.use(authMiddleware.checked);

// create message by channel id 
router.post("",multer.single("file"),messageController.createMessage)
// get message by channel id
router.get("/",messageController.getMessage)
// update message by id
router.put("/:id",multer.single("file"),messageController.updateMessage)
// delete message
router.delete("/:id",multer.single("file"),messageController.deleteMessage);


module.exports = router;