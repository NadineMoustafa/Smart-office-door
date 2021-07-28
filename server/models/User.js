
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lastMeetingTime:{
        type:String,
        required:false
    },
    lastMeetingInfo:{
        type:String,
        required:true
    },
    job:{
        type:String,
        default:"Not Specified",
        enum:["Doctor","TA","Student","Not Specified"]
    }

});


const User= mongoose.model('users', UserSchema)
module.exports = User
