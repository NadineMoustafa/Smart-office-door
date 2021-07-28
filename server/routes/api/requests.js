const express = require('express');
const router = express.Router();
const Request = require('../../models/Request');
const User = require('../../models/User');
const Cvdb = require('../../models/Cvdb');

//Getting all requests
router.get('/',async (req, res) => {
    const requests=await Request.find();
    res.json({ data: requests })
});
router.post('/dayReuests',async (req, res) => {
    //console.log(req.body.time)
    const requests=await Request.find({time:req.body.time});
    res.json({ data: requests })
});
//Getting a specific request
router.get('/:id', async (req, res) =>{
    try{
    const requestID=req.params.id
    const request = await Request.findById(requestID)
    if(!request) return res.status(404).send({error: 'Request does not exist'})
    return res.json({ msg:"Request was fetched successfully" ,data: request })
    }
   catch(error)
   {
       console.log(error)
   }
})

    //Edite here
router.post('/', async(req, res) => {
    try{
    const userName = req.body.userName;
    const oldName=req.body.oldName;
    const infoAboutRequest = req.body.infoAboutRequest;
    const time = new Date();
    var day =   time.getFullYear() + '-' + (time.getMonth()+1) + '-' +time.getDate() 
    const newRequest = {
		userName,
        infoAboutRequest,
        time:day,
        hour:time.getHours(),
        minute:time.getMinutes()    
    };
    const dbRequest= await Request.create(newRequest);
    const updatedUser= await User.find({name:oldName})
    if(updatedUser.length>0){
    updatedUser.forEach((user)=>{
        user.name=userName
        user.lastMeetingInfo=infoAboutRequest
        user.lastMeetingTime=day+":"+time.getHours()
        user.save()
    })}else{
	console.log(infoAboutRequest)
     const newUser = {
            name:userName,
            lastMeetingTime:day+":"+time.getHours(),
            lastMeetingInfo:infoAboutRequest,
            job:"Student"     
};
const dbUser= await User.create(newUser);
}
    const updatedUserCVDB= await Cvdb.find({name:oldName})
    updatedUserCVDB.forEach((user)=>{
        user.name=userName
        user.save()
    })

    return res.json({ msg:"Request was created successfully" ,data:{"Request": dbRequest,"User":updatedUser,"CVDB":updatedUserCVDB} });
}
    catch(error)
    {
        console.log(error)
    }
});
    //Edite here
//Updating a specific request
router.put('/:id', async (req, res) => {
    try {
  
     const requestID=req.params.id
     const request = await Request.findById(requestID)
     if(!request) return res.status(404).send({error: 'Request does not exist'})
     const updatedRequest = await Request.findByIdAndUpdate({_id : requestID},req.body)
     res.json({msg: 'Request is updated successfully'})
    }
    catch(error) {
        console.log(error)
    }  
 })


 //Deleting a specific request
 router.delete('/:id',async (req, res) => {
    try {
     const requestID = req.params.id
     const deletedRequest = await Request.findByIdAndRemove(requestID)
     res.json({msg:'Request was deleted successfully', data: deletedRequest})
    }
    catch(error) {
       console.log(error)
    }  
 })


 
module.exports = router;