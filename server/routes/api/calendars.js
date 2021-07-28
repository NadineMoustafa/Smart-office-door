const express = require('express');
const router = express.Router();
const Calendar = require('../../models/Calendar');

router.get('/',async (req, res) => {
    const calendars=await Calendar.find();
    res.json({ data: calendars })
});


//Getting a specific calendar


//Get the status based on the current time.
router.post('/SpecificTime', async (req, res) =>{
    try{
    const day=req.body.day
    const hour=req.body.hour
    const minute=req.body.minute
    
    var status;
    var meetingNow=false
    const calendar = await Calendar.findOne({day:day})
    if (!calendar || calendar.isOff ||calendar.isOut )
    {
        status="Outside the office"
    }
    else
    {
        for(var i=0;i<calendar.meetings.length;i++)
        {
            if(calendar.meetings[i].startHour<=hour && calendar.meetings[i].endHour>=hour )
            {
                if( (calendar.meetings[i].startHour==hour && calendar.meetings[i].startMinute<=minute) 
                || (calendar.meetings[i].endHour==hour && calendar.meetings[i].endMinute>=minute))
                    meetingNow=true
            }
        }
        if(meetingNow)
            status="Busy"
        else
            status="Available"
    }
    return res.json({ msg:"Calendar was fetched successfully" ,data: calendar ,status:status})
    }
   catch(error)
   {
       console.log(error)
   }
})



//Creating calendar
router.post('/', async(req, res) => {
    try{
    const day = req.body.day;
    const isOff=req.body.isOff;
    
    const meetings ={
        time:req.body.time,
        personName:req.body.personName,
        about:req.body.about
        
    }
    const newCalendar = {
		day,
        isOff,
        meetings:[meetings]    
    };
    const dbCalendar= await Calendar.create(newCalendar);
    return res.json({ msg:"Calendar was created successfully" ,data: dbCalendar });
}
    catch(error)
    {
        console.log(error)
    }
});




//Updating a specific calendar
router.put('/:id', async (req, res) => {
    try {
  
     const calendarID=req.params.id
     const calendar = await Calendar.findById(calendarID)
     if(!calendar) return res.status(404).send({error: 'Calendar does not exist'})
     const updatedCalendar = await Calendar.findByIdAndUpdate({_id : calendarID},req.body)
     res.json({msg: 'Calendar is updated successfully'})
    }
    catch(error) {
        console.log(error)
    }  
 })


//Deleting calendar
router.delete('/:id',async (req, res) => {
    try {
     const calendarID = req.params.id
     const deletedCalendar = await Calendar.findByIdAndRemove(calendarID)
     res.json({msg:'User was deleted successfully', data: deletedCalendar})
    }
    catch(error) {
       console.log(error)
    }  
 })


module.exports = router;
