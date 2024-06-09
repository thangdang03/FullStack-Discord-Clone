const JWT = require("jsonwebtoken");
const createToken = async(privateKey,payload) => {
    try {
        console.log({payload})
        const accessToken = await JWT.sign(payload,privateKey,{
            algorithm: "RS256",
            expiresIn: "1h"
        });
        const refreshToken = await JWT.sign(payload,privateKey,{
            algorithm: "RS256",
            expiresIn: "1 days"
        });

        return {accessToken,refreshToken};
    } catch (error) {
        console.log("error::" , error);
        return error
    }
};

module.exports = createToken;