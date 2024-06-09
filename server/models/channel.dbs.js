const mongoose = require('mongoose'); 

var ChannelSchema = new mongoose.Schema({
    name:{
        type:String,
        default: "general"
    },
    serverId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    type:{
        type: String,
        enum: ["text","voice","video"],
        default: "text",
        required:  [true,"type is require"] 
    }
    
},{
    timestamps: true,
    collection: "Channels"
});

//Export the model
module.exports = mongoose.model('Channel', ChannelSchema);