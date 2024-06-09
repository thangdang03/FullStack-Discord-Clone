const mongoose = require("mongoose");
const {urlDbs,database} = require("../config/conn.common");
const connectString = urlDbs+"/"+database;

class DATABASE {
    constructor(){
        this.connect();
    }

    connect = async() =>{
        try {
            if(1===1){
                mongoose.set('debug',true);
                  mongoose.set('debug',{color: true});
            }
            const connecting = await mongoose.connect(connectString);
            console.log("connect success" , connectString);
        } catch (error) {
            console.log("connect error",error);
        }
    }

    static getInstance () {
        if(!this.instance){
            return new DATABASE().instance
        }
        return this.instance
    }
}

const instance = DATABASE.getInstance();
module.exports = instance;