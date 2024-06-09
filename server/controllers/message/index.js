const convertObj = require("../../helmet/convert.obj");
const messageDbs = require("../../models/message.dbs");

class messageController{
    static async getMessage (req,res){
        try {
            const {channelid} = req.headers;
            const { page = 1  } = req.query;
            const limit = 15;
            const skip = (page - 1) * limit;
            console.log({limit,skip})
            const userId = req.user.id;
            const listMessage = await messageDbs.find({
                channelId: convertObj(channelid)
            })
            .populate("userId","name imageUrl email roles")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1})

            if(!listMessage){
                return res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
            }
            res.status(200).json({
                code: 200,
                metadata: {
                    data: listMessage.reverse()
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

    static async createMessage(req,res) {
        try {
            const {channelId,content,type} = req.body;
            const userId = req.user.id;
            const dataMessage = {
                channelId,
                content,
                type,
                userId
            }
            if(req.file){
                dataMessage.file = req.file.filename
            }
            const newMessage = await messageDbs.create({...dataMessage});
            if(!newMessage){
                return res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
            }
            res.status(201).json({
                code: 201,
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

    static async updateMessage(req,res){
        try {
            const idMessage = req.params.id;
            const {content} = req.body;
            const dataMessage = {
                content,
            }
            if(req.file){
                dataMessage.file = req.file.filename
            }
            console.log({idMessage,dataMessage,body: req.body})
            const newMessage = await messageDbs.findByIdAndUpdate(
                {_id: convertObj(idMessage)},
                {...dataMessage},
                {new: true}
            );
            if(!newMessage){
                return res.status(400).json({
                    code: 400,
                    metadata: "not success"
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

    static async deleteMessage(req,res){
        try {
            const idMessage = req.params.id;
            const newMessage = await messageDbs.findByIdAndUpdate(
                {_id: convertObj(idMessage)},
                {delete: true},
                {new: true}
            );
            if(!newMessage){
                return res.status(400).json({
                    code: 400,
                    metadata: "not success"
                });
            }
            res.status(200).json({
                code: 200,
                metadata: " success"
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
module.exports = messageController