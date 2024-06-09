const convertObj = require("../../helmet/convert.obj");
const userModel = require("../../models/users.db");

class userController{
    static async getUserById(req,res){
        try {
            const findUser = await userModel.findById(convertObj(req.user.id)).lean();
            const {password,roles,verify,...other} = findUser;
            res.status(200).json({
                code: 200,
                metadata: {
                    data: other
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                metadata: "server error"
            });
        }
    }

    static async updateUser (req,res){
        try {
            const userId = convertObj(req.user.id);
            const userData = {
                name: req.body.name,
                userID: userId
            }
            if(req.file){
                userData.imageUrl = `http://localhost:4000/${req.file.filename}`;
            }
            const newServer = await userModel.findByIdAndUpdate({_id: convertObj(userId)},{
                ...userData
            },{new:true});
           
            if(newServer){
                res.status(200).json({
                    code: 200,
                    metadata: "success"
                });
                return
            }    
            res.status(400).json({
                code: 400,
                metadata: "not success"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                metadata: "servererror"
            });
        }
    }
}

module.exports = userController