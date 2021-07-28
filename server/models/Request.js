
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    infoAboutRequest:{
        type:String,
        required:true
    },
    time:{
        type:String
        },
        hour:{
            type:String
            },
            minute:{
                type:String
                }
});


const Request= mongoose.model('requests', RequestSchema)
module.exports = Request
