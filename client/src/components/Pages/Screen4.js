
import React from 'react';
import {Card} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
//const backEndIP= 'http://192.168.1.11:3333'
const backEndIP= 'http://192.168.8.102:3333'


class Screen4 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        requests:"",
        oldRes:""
        

        }
        
      }
  componentDidMount(){

    this.requestRendering()

  }
 requestRendering(){
  const time =new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' +new Date().getDate()
  const currentHour=new Date().getHours()
  const currentMinute=new Date().getMinutes()
  console.log(time)
  axios.post(`${backEndIP}/routes/api/requests/dayReuests`,{time:time})

  .then((res) => {
  
  let requestCards=[]
  if(res.data.data.length===0) this.setState({requests:"NO REQUESTS TODAY"})
  else{
    if(this.state.oldRes!==res.data.data){
    res.data.data.forEach(element => {
      console.log(element)
      let requestSince
      if(currentHour -parseInt(element.hour, 10)!==0) {
      requestSince=currentHour -parseInt(element.hour, 10) 
      if(requestSince===1) requestSince+="hour ago"
      else requestSince+="hours ago"
      }else if (currentMinute -parseInt(element.minute, 10) !==0 ){
      requestSince=currentMinute -parseInt(element.minute, 10) 
      if(requestSince===1) requestSince+="min ago"
      else requestSince+="mins ago"
      }else requestSince="now"
      requestCards.push(  <Card>
        <Card.Body>
      <Card.Title>{element.userName}</Card.Title>
          <Card.Text>
          {element.infoAboutRequest}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{requestSince}</small>
        </Card.Footer>
      </Card>)
    });
    this.setState({requests:requestCards})
    this.setState({oldRes:res.data.data})
  }
  }
 })
 .catch((err) =>{
  console.log(err)
 })
 axios.post(`${backEndIP}/routes/api/calendars/SpecificTime`,{time,currentHour})
 .then((res) => {
   //if(res.data.status ==="Available") window.location.href=`http://192.168.1.11/splash`
   if(res.data.status ==="Available") window.location.href=`http://192.168.8.102/splash`
})
.catch((err) =>{
  alert(err)
 console.log(err)
})
 
setInterval(this.requestRendering.bind(this), 60000);
 }
render()
{
let requestsDisplay= this.state.requests.length ===0?<div style={{marginLeft:"50%"}}> <ReactLoading type="spinningBubbles" color='#00000'  /></div> :this.state.requests

    return ( 
      <div style={{ paddingTop:'2%' }} >
       <Card  bg="light" style={{ width: '90%'  ,marginLeft:'5%' ,padding:'5%'  }}
    >
{requestsDisplay}
</Card>

</div>
    )
}

}



export default Screen4;