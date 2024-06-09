const JWT = require("jsonwebtoken");
const keysDbs = require("../models/keys.dbs");
const memeberDbs = require("../models/memeber.dbs");
const convertObj = require("../helmet/convert.obj");
class AthMidelware{
    static async checkUser (req,res,next){
        try {
            const {userid} = req.headers;
            const {token} = req.cookies;
            if(!userid || !token){
                res.status(409).json({
                    code: 409,
                    message: "you are not login"
                });
                return;
            }
            const findKey = await keysDbs.findOne({userID: userid});
            if(!findKey){
                res.status(404).json({
                    code: 404,
                    message: "you are not register"
                });
                return;
            }

            if(findKey.refreshTokened.includes(token)){
                res.status(409).json({
                    code: 409,
                    message: "something wrong with you "
                });
                return;
            }
           await JWT.verify(token,findKey.publicKey,(error,data)=>{
                console.log({data,error})
                if(error){
                    console.log(error);
                    return res.status(409).json({
                        code: 409,
                        message: "token is invalid"
                    });
                }
                if(userid !== data._id){
                    res.status(404).json({
                        code: 404,
                        message: "you are not authentition"
                    });return;
    
                }
                req.user = {id: data._id , roles: data.roles,token: findKey.refreshToken};
                next();
            });
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
        }
    }
    static async checked (req,res,next){
        try {
            const {userid,token} = req.headers;
            console.log({userid,token});
            if(!userid || !token){
                res.status(409).json({
                    code: 409,
                    message: "you are not login"
                });
                return;
            }
            const findKey = await keysDbs.findOne({userID: userid});
            if(!findKey){
                res.status(404).json({
                    code: 404,
                    message: "you are not register"
                });
                return;
            }

            if(findKey.refreshTokened.includes(token)){
                res.status(409).json({
                    code: 409,
                    message: "something wrong with you "
                });
                return;
            }

            await JWT.verify(token,findKey.publicKey,(error,data)=>{
                if(error){
                    console.log(error);
                    return res.status(409).json({
                        code: 409,
                        message: "token is invalid"
                    });
                }
                if(userid !== data._id){
                    res.status(404).json({
                        code: 404,
                        message: "you are not authenticator"
                    });return;
    
                }
                req.user = {id: data._id , roles: data.roles,token: findKey.refreshToken};
                next();
            });
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
        }
    }

    static async checkRoles (req,res,next){
        try {
            const {userid,token,serverId} = req.headers;
            if(!userid || !token){
                res.status(409).json({
                    code: 409,
                    message: "you are not login"
                });
                return;
            }
            const findKey = await keysDbs.findOne({userID: userid});
            if(!findKey){
                res.status(404).json({
                    code: 404,
                    message: "you are not register"
                });
                return;
            }
            if(findKey.refreshTokened.includes(token)){
                res.status(409).json({
                    code: 409,
                    message: "something wrong with you "
                });
                return;
            }

            await JWT.verify(token,findKey.publicKey,async (error,data)=>{
                if(error){
                    console.log(error);
                    return res.status(409).json({
                        code: 409,
                        message: "token is invalid"
                    });
                }
                const findMember =  await memeberDbs.findOne({userID: convertObj(userid),serverID: convertObj(serverId)});
                if(userid !== data._id && findMember.roles != "ADMIN" | "MANAGER"){
                        res.status(404).json({
                            code: 404,
                            message: "you are not authenticator"
                        });return;
                }
                req.user = {id: data._id , roles: data.roles,token: findKey.refreshToken};
                next();
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

module.exports = AthMidelware;