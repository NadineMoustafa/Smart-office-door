
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CvdbSchema = new Schema({
   faceEncode:{
       type:Buffer
   },
   name:{
       type:String
   },
   img:{
       type:String
   }

});



const Cvdb= mongoose.model('cvdb', CvdbSchema)
module.exports = Cvdb
