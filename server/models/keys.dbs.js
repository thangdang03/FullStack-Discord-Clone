const mongoose = require('mongoose'); 

var keySchema = new mongoose.Schema({
    id:{
        type: mongoose.Types.ObjectId,
    },
    userID:{
        type: String,
        required: true
    },
    publicKey:{
        type: String,
        required: true
    },
    refreshToken:{
        type:String,
        required:true,
    },
    refreshTokened:{
        type: Array,
        default: []
    },
},{
    timeseries: true,
    collection: "KEYS"
});

module.exports = mongoose.model('Key', keySchema);