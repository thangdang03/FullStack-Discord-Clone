const crypto = require("crypto");
const bcrypt = require("bcrypt");
const userModel = require("../../models/users.db");
const createToken = require("../../helmet/createToken");
const Keys = require("../../models/keys.dbs");
const { emailToken, urlClient, clientId, clientSecret, urlRedirect, refreshToken } = require("../../config/conn.common");
const JWT = require("jsonwebtoken");
const {google} = require("googleapis");
const { sendEmail } = require("../../helmet/sendEmail");
const mongoose = require("mongoose");
const { converHex } = require("../../helmet/convert.hex");
const convertObj = require("../../helmet/convert.obj");
const authenClient = new google.auth.OAuth2(clientId,clientSecret,urlRedirect);
authenClient.setCredentials({refresh_token: refreshToken});

class loginController {
    static async loginEmail (req,res){
        try {
            const {password,email} = req.body;  
            const findUser = await userModel.findOne({email: email}).lean();
            if(findUser){
                const signPassword = await bcrypt.compare(password,findUser.password);
                if(!signPassword ){
                    res.status(400).json({
                        code: 400,
                        message: "password or email wrong "
                    });
                    return;
                }
                if(findUser.verify === false){
                    const token = JWT.sign({id: findUser._id},emailToken,{expiresIn: "1 days"});
                    console.log({findUser,token});
                    const sending = await sendEmail({
                        to: email,
                        subject: "VERIFY EMAIL",
                        htmlContent: `
                                <html lang="en">
                                <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                </head>
                                <div class="container" style="background-color: #f9f9f9; width: 100%;height:100%;">
                                    <div class="imgae" style="padding: 30px 0px;width: 100%;position: relative;text-align: center;">
                                        <span style="    color: rgb(88, 101, 242);font-size: 24px;font-family: fantasy;font-weight: 100;
                                        position: absolute;top: 35%;left: 53%;">DISCORD CLONE</span>
                                    </div>
                                    <div class="verify_item" style="margin-left: 25%;background: white;width: 50%;">
                                        <div class="text" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;padding: 7%;">
                            
                                            <h2 style="font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;
                                            font-size: 20px;color: #4f545c;letter-spacing: 0.27px;">
                                            Hey ${findUser.name}
                                            </h2>
                                            <p style="color: #737f8d; margin-bottom: 10%; font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size: 16px;line-height: 24px;text-align: left;">
                                                Thanks for registering for an account on Discord! Before we get started, 
                                                we just need to confirm that this is you. Click below to verify your email address:
                                            </p>
                                            <a href="${urlClient}/verify/${token}" style="text-decoration: none;color:white;padding: 3%;background-color: rgb(88, 101, 242);position: relative;left: 0
                                             ;border: none;margin-left: 44%; border-radius: 4px;font-family: Ubuntu, Helvetica, Arial, sans-serif;font-size: 15px;font-weight: normal;text-transform: none;
                                            ">Verify Email</a>
                                            <hr style="color: #737f8d;margin-top: 10%;">
                                            <p style="color: #737f8d; margin-bottom: 10%; font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size: 16px;line-height: 24px;">
                                                Cần giúp đỡ? Liên hệ nhóm hỗ trợ hoặc thông qua Twitter @discord.
                                                Muốn cung cấp phản hồi? Hãy cho chúng tôi biết ý kiến của bạn trên trang phản hồi.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </html>`,
                        autheClient: authenClient
                    });
                    res.status(409).json({
                        code: 409,
                        message: "Your email verification link has been sent to your email, please check your email!!!  "
                    });
                    return;
                }
                 // create token 
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
                const {accessToken,refreshToken} = await createToken(privateKey,payload);
                 // save dbs 
                 const key = await Keys.updateOne({userID: findUser._id},{
                    userID: findUser._id,
                    publicKey: publicKey.toString(),
                    refreshToken: refreshToken,
                    refreshTokened: []
                },{new: true,upsert: true});

                console.log(accessToken)
                 // send back
                res.cookie("token",refreshToken,{
                    secure: true,
                });
                res.status(200).json({
                    code: 200,
                    message: "login success",
                    metadata: {
                        token: accessToken,
                        id: findUser._id
                    }
                }); 
                return; 
            };
            res.status(400).json({
                code: 400,
                message: "email not register"
            });
            return;
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
        }
    }

    static async loginFacebook (req,res){
        try {
            const user = req.user;
            let id = await converHex(req.user.id);
            id = new mongoose.Types.ObjectId(id);
            const findUser = await userModel.findById({_id: id}).lean();
            if(!findUser){
                //save to dbs
                const genHash = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.user.id,genHash);
                var newUser = await userModel.create({
                    _id:  id,
                    name: user.displayName,
                    imageUrl: user.photos[0].value,
                    password: hashPassword
                });
                res.redirect(`${urlClient}/user/${newUser._id}`);
                return;
            };
            res.redirect(`${urlClient}/user/${findUser._id}`);
            return;
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
            return;
        }
    }

    static async loginGoogle(req,res){
        try {
            const user = req.user;
            let id = await converHex(req.user.id);
            id = new mongoose.Types.ObjectId(convertObj(id));
            const findUser = await userModel.findById({_id: id}).lean();
            if(!findUser){
                //save to dbs
                const genHash = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.user.id,genHash);
                var newUser = await userModel.create({
                    _id:  id,
                    name: user.displayName,
                    imageUrl: user.photos[0].value,
                    password: hashPassword
                });
                res.redirect(`${urlClient}/user/${newUser._id}`);
                return;
            };
            res.redirect(`${urlClient}/user/${findUser._id}`);
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
            return;
        }
    }
    
    static async loginGithub(req,res){
        try {
            const user = req.user;
            let id = await converHex(req.user.id);
            id = new mongoose.Types.ObjectId(id);
            const findUser = await userModel.findById({_id: id}).lean();
            if(!findUser){
                //save to dbs
                const genHash = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.user.id,genHash);
                var newUser = await userModel.create({
                    _id:  id,
                    name: user.username,
                    imageUrl: user.photos[0].value,
                    password: hashPassword
                });
                res.redirect(`${urlClient}/user/${newUser._id}`);
                return;
            };
            res.redirect(`${urlClient}/user/${findUser._id}`);
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
            return;
        }
    }

    static async LoginSuccess (req,res){
        try {
            const id = req.params.id;
            const findUser = await userModel.findById({_id: id}).lean();
            const payload =  {_id: findUser._id,roles: findUser.roles};
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
            const {accessToken,refreshToken} = await createToken(privateKey,payload);
            const key = await Keys.updateOne({userID: findUser._id},{
                userID: findUser._id,
                publicKey:publicKey.toString(),
                refreshToken: refreshToken,
                refreshTokened: []
            },{new: true,upsert: true});
             // send back
             res.cookie("token",refreshToken,{
                secure: true,
            });
            console.log({accessToken});
            res.status(201).json({
                code: 201,
                message: "login success",
                metadata: {
                    token: accessToken,
                    user:{
                        id: findUser._id,
                        name: findUser.name,
                        urlImage: findUser.imageUrl,
                        email: findUser.email
                    }
                }
            });
            return;
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
            return
        }
    }
};

module.exports = loginController;