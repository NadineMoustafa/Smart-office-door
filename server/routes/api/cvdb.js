const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Cvdb = require('../../models/Cvdb');

router.get('/',async (req, res) => {
    const cvdb=await Cvdb.find();
    res.json({ data: cvdb })
});

router.post('/', async(req, res) => {
    try{
    const name = req.body.name;  
    const newCvdb = {
		name  
    };
    const dbCvdb= await Cvdb.create(newCvdb);
    //const updatedUser= await User.findByIdAndUpdate(userID,{lastMeetingInfo:infoAboutRequest})
    return res.json({ msg:"Cvdb was created successfully" ,data: dbCvdb });
}
    catch(error)
    {
        console.log(error)
    }
});

module.exports = router;