const createToken = require("../../helmet/createToken");
const keysDbs = require("../../models/keys.dbs");
const userModel = require("../../models/users.db");
const crypto = require("crypto");

class handelTokenController {
    static async GetNewToken(req,res){
        try {
            const {id,roles,token} = req.user;
            const findUser = await userModel.findById(id);
            const payload =  {_id: findUser._id,roles: roles};
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
            const {accessToken,refreshToken} = await createToken(privateKey,publicKey,payload);
            
            const key = await keysDbs.updateOne({userID: findUser._id},{
                userID: findUser._id,
                publicKey:publicKey.toString(),
                refreshToken: refreshToken,
                $push:{refreshTokened: token    }
            },{new: true,upsert: true});
             // send back
             res.cookie("token",refreshToken,{
                secure: true,
            });
            res.status(201).json({
                code: 201,
                message: "login success",
                metadata: {
                    token: accessToken,
                    user:{
                        id: findUser._id,
                        name: findUser.name,
                        image: findUser.imageUrl,
                        email: findUser.email
                    }
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

module.exports = handelTokenController