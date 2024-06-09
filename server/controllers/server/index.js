const convertObj = require("../../helmet/convert.obj");
const channelDbs = require("../../models/channel.dbs");
const memeberDbs = require("../../models/memeber.dbs");
const serverDbs = require("../../models/server.dbs");

class serverController {
    static async createServer (req,res){
        try {
            const userId = convertObj(req.user.id);
            const serverData = {
                name: req.body.name,
                userID: userId
            }
            if(req.file){
                serverData.imageUrl = req.file.filename;
            }
            const newServer = await serverDbs.create({...serverData});
           
            if(newServer){
                const newChannel = await channelDbs.create({type: "text",serverId: newServer._id});
                const member = await memeberDbs.create({roles: "ADMIN",userID: req.user.id,serverID: newServer._id});
                res.status(201).json({
                    code: 201,
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

    static async getServerById(req,res){
        try {
            const id = req.user.id;
            const get = await memeberDbs.find({
                userID: convertObj(id),
            }).populate("serverID","name userID imageUrl _id invitationCode").exec();
            const DataFilter = await get.map(data=>{
                return data.serverID
            })
            res.status(200).json({
                code: 200,
                metadata: {
                    data: [...DataFilter]
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                metadata: "server error"
            });
        }
    }

    static async updateServerById(req,res){
        try {
            const userId = convertObj(req.user.id);
            const serverData = {
                name: req.body.name,
                userID: userId
            }
            if(req.file){
                serverData.imageUrl = req.file.filename;
            }
            console.log({serverData});
            const newServer = await serverDbs.findByIdAndUpdate(req.params.id,{
                ...serverData
            },{new: true});
            if(!newServer){
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
            console.log(error);
            res.status(500).json({
                code: 500,
                metadata: "server error"
            });
        }
    }

    static async deleteServerById(req,res){
        try {
            const serverId = req.params.id;
            const deleting = await serverDbs.findByIdAndDelete(convertObj(serverId));
            if(!deleting){
                res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
                return;
            }
            const deletingMember = await memeberDbs.deleteMany({serverID: convertObj(serverId)});
            const deletingChannel = await channelDbs.deleteMany({serverId: convertObj(serverId)});
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

module.exports = serverController;