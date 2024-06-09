const mogoose = require("mongoose");

const userSchema = new mogoose.Schema({
    name:{
        type: String,
        required: true,
        length: 100
    },
    imageUrl: {
        type: String,
    },
    email:{
        type: String,
        length: 150,
    },
    password:{
        type: String,
        length: 100
    },
    roles:{
        type: String,
        enum:["user","admin","convert"],
        default: "user"
    },
    verify:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    collection: 'USERS'
});

const userModel = mogoose.model("user",userSchema);
module.exports = userModel;