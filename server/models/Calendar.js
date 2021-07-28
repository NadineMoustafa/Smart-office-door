
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MeetingSchema = new Schema({
    startHour:{
        type:Number,
        required:true
    },
    endHour:{
        type:Number,
        required:true
    },
    startMinute:{
        type:Number,
        required:true
    },
    endMinute:{
        type:Number,
        required:true
    },
    personName:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    }
},{_id:false})

const CalendarSchema = new Schema({
    day:{
        type:String,
        required:true
    },
    isOff:{
        type:Boolean,
        default:false,
        required:true
    },
    isOut:{
        type:Boolean,
        default:false,
        required:false
    },
    meetings:{
        type:[MeetingSchema]
    }
})


const Calendar= mongoose.model('calendars', CalendarSchema)
module.exports = Calendar
