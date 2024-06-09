const convertObj = require("../../helmet/convert.obj");
const memeberDbs = require("../../models/memeber.dbs");

class memberController {
    static async getListMember(req,res){
        try {
            const {serverid} = req.headers;
            const listMember = await memeberDbs.find({serverID: convertObj(serverid)})
            .populate("userID","name imageUrl email").lean();
            if(!listMember){
                res.status(404).json({
                    code: 404,
                    metadata: "can not get found member"
                });
            }
            res.status(200).json({
                code: 200,
                metadata: {
                    data: listMember
                }
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                metadata: "servererror"
            });
        }
    }
    
    static async LeaverServer(req,res){
        try {
            const id = req.user.id;
            const serverid = req.params.id;
            const leaving = await memeberDbs.findOneAndDelete({userID:convertObj(id),serverID: serverid});
            if(!leaving){
                res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
                return;
            }
            res.status(200).json({
                code: 200,
                metadata: "success"
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                code: 500,
                metadata: "servererror"
            });
        }
    }

    static async kickMember(req,res){
        try {
            const {memberid} = req.headers;
            console.log(memberid)
            const leaving = await memeberDbs.findByIdAndDelete(convertObj(memberid));
            if(!leaving){
                res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
                return;
            }
            res.status(200).json({
                code: 200,
                metadata: "success"
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                code: 500,
                metadata: "servererror"
            });
        }
    }

    static async authenticationRoles(req,res){
        try {
            const memberId = req.params.id;
            const {roles} = req.body
            const deleting = await memeberDbs.findByIdAndUpdate(convertObj(memberId),
            {
                roles:  roles
            },{
                new: true
            }
            );
            if(!deleting){
                res.status(404).json({
                    code: 404,
                    metadata: "not success"
                });
                return;
            }

            res.status(200).json({
                code: 200,
                metadata: "success"
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                code: 500,
                metadata: "servererror"
            });
        }
    }

    
}

module.exports = memberController