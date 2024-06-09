const mongoose = require('mongoose');
const server = require('./server.dbs');
const user = require("./users.db");
var memberSchema = new mongoose.Schema({
   roles:{
        type:   String,
        enum: ["ADMIN","MANAGER","USER"],
        require: [true,"roles is required"]
        
   },
   userID:{
        type: mongoose.Types.ObjectId,
        ref: user,
        require: true,
   },
   serverID:{
        type: mongoose.Types.ObjectId,
        ref: server,
        require: true
   }
},{
    timestamps: true,
    collection: "MEMBERS"
});

module.exports = mongoose.model('MEMBER', memberSchema);