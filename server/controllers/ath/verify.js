const JWT = require("jsonwebtoken");
const userModel = require("../../models/users.db");
const {urlClient,emailToken} = require("../../config/conn.common");
const crypto = require("crypto");
const createToken = require("../../helmet/createToken");
const Keys = require("../../models/keys.dbs");

class verifyController {
    static async verifyEmail  (req,res) {
        try {
            const token = req.params.token;
            const verify = await JWT.verify(token,emailToken);
            if(!verify){
                res.redirect(urlClient+"/validatorEmail");
                return;
            };
            const findUser = await userModel.findByIdAndUpdate(verify.id,{
                verify: true
            },{new: true});

            if(!findUser){
                res.json("you not validator");
                res.status(404).json({
                    code: 404,
                    message: "you not validator",
                    metadata: {}
                });
                return;
            }
            // create token and send back
            const {privateKey,publicKey} = await crypto.generateKeyPairSync("rsa",{
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                  type: 'pkcs8',
                  format: 'pem',
                }
            });
            const payload = {
                _id: findUser._id,
                roles: findUser.roles
            };
            //save key token
            const {accessToken,refreshToken} = await createToken(privateKey,payload);
            // save dbs 
            const key = await Keys.updateOne({userID: findUser._id},{
                userID: findUser._id,
                publicKey:  publicKey,
                refreshToken: refreshToken,
                refreshTokened: []
            },{new: true,upsert: true});

            // send back
            res.cookie("token",refreshToken,{
                secure: true,
            
            });
            res.status(200).json({
                code: 200,
                message: "verify success",
                metadata: {
                    token: accessToken,
                    id: findUser._id
                }
            });    
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
        }
    }
}


module.exports = verifyController


