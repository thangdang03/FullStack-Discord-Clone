const mongoose = require("mongoose");


const serverSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userID:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    imageUrl: {
        type: String,
    },
    invitationCode:{
        type: String,
        default: null
    },
},{
    timestamps: true,
    collection: 'SERVERS'
});

module.exports = mongoose.model("server",serverSchema);;