const { google } = require("googleapis");
const { clientId, clientSecret, urlRedirect, refreshToken, emailToken, urlClient } = require("../../config/conn.common");
const userModel = require("../../models/users.db");
const authenClient = new google.auth.OAuth2(clientId,clientSecret,urlRedirect);
authenClient.setCredentials({refresh_token: refreshToken});
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../helmet/sendEmail");

class ResetController{
    static async verifyPassword  (req,res) {
        try {
            const token = req.params.token;
            const {newPassWord} = req.body;
            console.log({newPassWord,token})
            const verify = await JWT.verify(token,emailToken);
            if(!verify){
                res.redirect(urlClient+"/validatorEmail");
                return;
            };
            const genHash = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassWord,genHash);
            
            const findUser = await userModel.findByIdAndUpdate(verify.id,{
                verify: true,
                password: hashPassword
            },{new: true});

            if(!findUser){
                res.status(404).json({
                    code: 404,
                    message: "you not validator",
                    metadata: {}
                });
                return;
            }
            res.status(200).json({
                code: 200,
                message: "success"
            });
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
        }
    }

    static async sendTokenReset (req,res) {
        try {
            const {email} = req.body;
            // find user by email 
            const findUser = await userModel.findOne({email: email}).lean();
            if(!findUser){
                res.status(404).json({
                    code: 404,
                    message: "you not validator",
                    metadata: {}
                });
                return;
            }
            // send email for user with token
            const token = JWT.sign({id: findUser._id},emailToken,{expiresIn: "1 days"});
            const sending = await sendEmail({
                to: email,
                subject: "Yêu Cầu Đặt Lại Mật Khẩu Discord",
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
                                             Your Discord password can be reset by clicking the button below. 
                                             If you did not request a new password, please ignore this email.
                                    </p>
                                    <a href="${urlClient}/reset/${token}" style="text-decoration: none;color:white;padding: 3%;background-color: rgb(88, 101, 242);position: relative;left: 0
                                     ;border: none;margin-left: 44%; border-radius: 4px;font-family: Ubuntu, Helvetica, Arial, sans-serif;font-size: 15px;font-weight: normal;text-transform: none;
                                    ">Reset Password</a>
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
            res.status(200).json({
                code: 200,
                message: "reset token have send",
                metadata:{
                    id: findUser._id
                }
            })
            return;
        } catch (error) {
            console.log("error:: ",error);
            res.status(500).json({
                code: 500,
                message: "server is error"
            });
        }
    }
};

module.exports = ResetController;