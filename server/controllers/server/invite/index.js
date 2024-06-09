const { urlClient } = require("../../../config/conn.common");
const memeberDbs = require("../../../models/memeber.dbs");
const serverDbs = require("../../../models/server.dbs");
const { v4:uuidv4 } =require('uuid');
const convertObj = require("../../../helmet/convert.obj");

class inviteController {
    static async generateInvite(req,res){
        try {
            const {id} = req.user;
            const serverId = req.headers.server;
            console.log({serverId,id})
            // check server id
            const findServer = await serverDbs.findById(convertObj(serverId));
            if(!findServer){
                return res.status(400).json({
                    code: 400,
                    metadata: "server is extend"
                }); 
            }
            // generate id code invite
            if(!findServer.invitationCode){
                const inviteCode = uuidv4();
                const invite = await findServer.updateOne({invitationCode: inviteCode},{new: true,upsert:true});
            }
            // send back link code
            res.status(200).json({
                code: 200,
                metadata: {
                    inviteCode: `${urlClient}/invite/${findServer.invitationCode}`
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

    static async getInviteCode(req,res){
        try {
            const {userid} = req.headers;
            const inviteCode = req.params.id;
            console.log(userid,inviteCode)
            // find inviteCode
            const findServer = await serverDbs.findOne({invitationCode: inviteCode}).lean();
            if(!findServer){
                return res.status(400).json({
                    code: 400,
                    metadata: "cannot find server"
                });
            }
            // add member 
            const addMember = await memeberDbs.findOne({
                userID: convertObj(userid),
                serverID: findServer._id
            }).lean();
            console.log({addMember});

            if(!addMember){
                const newMember = await memeberDbs.create({
                    userID: convertObj(userid),
                    serverID: findServer._id,
                    roles: "USER"
                });
            }
            res.status(200).json({
                code: 200,
                metadata: "success"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                metadata: "server error"
            });
        }
    }
}

module.exports = inviteController;