const userModel = require("../../models/users.db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {google} = require("googleapis");
const {refreshToken,urlRedirect,clientId,clientSecret,emailToken,urlClient} = require("../../config/conn.common");
const { sendEmail } = require("../../helmet/sendEmail");

const authenClient = new google.auth.OAuth2(clientId,clientSecret,urlRedirect);
authenClient.setCredentials({refresh_token: refreshToken});

class registerController{
    static async register(req,res){
        try {
            // find user exit
            const {email,username,password} = req.body;
            const findUser = await userModel.findOne({email: email}).lean();
            // check user have extends
            if(!findUser){
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password,salt);
                const newUser = await userModel.create({
                    email: email,
                    name: username,
                    password: hashPassword
                });
                // create token for email token
                const token = JWT.sign({id: newUser._id},emailToken,{expiresIn: "1 days"});
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
                                        Hey ${username}
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
                    autheClient: await authenClient
                });
                res.status(201).json({
                    code: 201,
                    message: "user is registered",
                    metadata:{
                        id: newUser._id
                    }
                })
                return;
            }
            res.status(409).json({
                code: 404,
                message:  'email already registered',
                metadata:{}
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "server error 500"
            })
        }
    }
}

module.exports = registerController;