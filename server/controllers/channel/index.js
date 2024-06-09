const convertObj = require("../../helmet/convert.obj");
const channelDbs = require("../../models/channel.dbs");
const messageDbs = require("../../models/message.dbs");

class ChannelController{
    static async CreateChannel(req,res){
        try {
            const {name,type} = req.body;
            const id = req.params.id;
            if(!name && !type){
                res.status(400).json({
                    code: 400,
                    metadata: "name or type is required"
                });
                return;
            }
            const listChannel = await channelDbs.create({name,type,serverId: convertObj(id)});

            if(!listChannel){
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
                metadata: "servererror"
            });
        }
    }

    static async getChannelByServerId(req,res){
        try {
            const {serverid} = req.headers;
            const listChannel = await channelDbs.find({serverId: convertObj(serverid)});
            if(!listChannel){
                return res.status(500).json({
                    code: 500,
                    metadata: "not success"
                });
            }
            res.status(200).json({
                code: 200,
                metadata: {
                    data: listChannel
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

    static async editChannel(req,res){
        try {
            const {name,type} = req.body;
            const id = req.params.id;
            if(!name && !type){
                res.status(400).json({
                    code: 400,
                    metadata: "name or type is required"
                });
                return;
            }

            const editChannel = await channelDbs.findByIdAndUpdate({_id: convertObj(id)},
            {
                name,
                type
            },
            {
                new: true
            });
            if(!editChannel){
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
                metadata: "servererror"
            });
        }
    }
    
    static async deleteChannel(req,res){
        try {
            const id = req.params.id;

            const deleting  = await channelDbs.findByIdAndDelete({_id: convertObj(id)});
            if( !deleting ){
                res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
                return;
            }

            const deletingMessage = await messageDbs.deleteMany({channelId: convertObj(id)});
            if(!deletingMessage){
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
                metadata: "servererror"
            });
        }
    }
}

module.exports = ChannelController