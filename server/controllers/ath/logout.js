const keysDbs = require("../../models/keys.dbs");

class logoutController {
    static async logout(req,res){
        try {
            const userId = req.user.id;
            const deleteKey = await keysDbs.deleteOne({userID: userId});
            if(!deleteKey){
                res.status(400).json({
                    code: 400,
                    message: "delete not success"
                });
                return;
            }
            res.clearCookie("token");
            res.status(200).json({
                code: 200,
                message: "logout success"
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

module.exports = logoutController;