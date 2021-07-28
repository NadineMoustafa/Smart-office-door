const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Cvdb = require('../../models/Cvdb');



//Getting all users
router.get('/',async (req, res) => {
    const users=await User.find();
    res.json({ data: users })
});

//Get certain user by ID
router.get('/:name', async (req, res) =>{
    try{
    const userName=req.params.name
    const user = await User.findOne({name:userName})
    if(!user) return res.status(404).send({error: 'User does not exist'})
    return res.json({ msg:"User was fetched successfully" ,data: user })
    }
   catch(error)
   {
       console.log(error)
   }
})

//Getting the history of the meeting by his name and pictutr
router.post('/HistoryOfTheMeeting', async(req, res) => {
    try{
    const name = req.body.name;
    const user = await User.findOne({name:name})
  
    if(!user) return res.status(404).send({error: 'User does not exist'})
    return res.json({ msg:"User was fetched successfully" ,data: user ,lastMeetingInfo:user.lastMeetingInfo,lastMeetingTime:user.lastMeetingTime})
}
catch(error)
{
   console.log(error)
}});


//Getting the face encode
router.post('/FaceEncode', async(req, res) => {
    try{
    const userName = req.body.name;
    const cvdb = await Cvdb.findOne({name:userName})

    if(!cvdb) return res.status(404).send({error: 'Encode does not exist'})
    return res.json({ msg:"Cvdb was fetched successfully" ,data: cvdb})
}
catch(error)
{
   console.log(error)
}});


//Creating a new User
router.post('/', async(req, res) => {
    try{
        const name = req.body.name;
        const lastMeetingTime=req.body.lastMeetingTime
        const lastMeetingInfo = req.body.lastMeetingInfo;
        const job = req.body.job;
         const newUser = {
                name,
                lastMeetingTime,
                lastMeetingInfo,
                job     
    };
    const dbUser= await User.create(newUser);
    return res.json({ msg:"User was created successfully" ,data: dbUser });
}
    catch(error)
    {
        console.log(error)
    }
});

//Updating a specific user
router.put('/:id', async (req, res) => {
    try {
  
     const userID=req.params.id
     const user = await User.findById(userID)
     if(!user) return res.status(404).send({error: 'User does not exist'})
     const updatedUser = await User.findByIdAndUpdate({_id : userID},req.body)
     res.json({msg: 'User is updated successfully'})
    }
    catch(error) {
        console.log(error)
    }  
 })

 //Deleting a specific user
 router.delete('/:id',async (req, res) => {
    try {
     const userID = req.params.id
     const deletedUser = await User.findByIdAndRemove(userID)
     res.json({msg:'User was deleted successfully', data: deletedUser})
    }
    catch(error) {
       console.log(error)
    }  
 })
  
module.exports = router;

