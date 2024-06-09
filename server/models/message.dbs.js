const mongoose = require('mongoose'); // Erase if already required
const user = require("./users.db");

var messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: user,
        required:true,
    },
    channelId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    delete: {
        type: Boolean,
        default: false
    },
    file:{
        type: String,
        default: null
    },
    type:{
        type: String,
        enum: ["image/jpeg","image/png","application/pdf"],
        default: null
    }
},{
    timestamps: true,
    collection: "Messages"
});

module.exports = mongoose.model('User', messageSchema);