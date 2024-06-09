const nodemailer = require("nodemailer");
const {refreshToken,clientId,clientSecret} = require("../config/conn.common");

const sendEmail =  async({to,subject,htmlContent,autheClient}) =>{

    const accessToken = await autheClient.getAccessToken();
    
    const transporter = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: "ksc12dthang31@gmail.com",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken
      },
    });

    const info = await transporter.sendMail({
      from: "discord clone <ksc12dthang31@gmail.com> ",
      to: to,
      subject: subject,
      html: htmlContent, 
    });
};

module.exports = {
    sendEmail
}