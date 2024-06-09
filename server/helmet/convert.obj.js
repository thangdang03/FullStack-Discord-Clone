const mongoose = require("mongoose");

const convertObj = (id) =>{
    try {
        const newId = new mongoose.Types.ObjectId(id);
        return newId;
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports= convertObj