const router = require("express").Router();
const { createToken } = require('../../helmet/createTokenVideo');

router.post("",async (req,res)=>{
    try {
        const {room,user} = req.body;
        const videoToken = await createToken(room,user);
        if(!videoToken){
            return res.status(400).json({
                code: 400,
                metadata: {
                    message: "not success"
                }
            })
        }
        res.status(200).json({
            code: 200,
            metadata: {
                videoToken
            }
        })
    } catch (error) {
        console.log(error,error);
        res.status(500).json({
            code: 500,
            metadata: {
                message: "not success"
            }
        })
        return;
    }
})

module.exports =  router;