import React from 'react';
import logo from './2.jpeg'
import './App.css';
import axios from 'axios';
//const backEndIP= 'http://192.168.1.11:3333'
const backEndIP= 'http://192.168.8.102:3333'
class SplashScreen extends React.Component{
    componentDidMount(){
        this.requestRendering()
      }
     requestRendering(){
      const time =new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' +new Date().getDate()
      const currentHour=new Date().getHours()
      //const currentMinute=new Date().getMinutes()
      console.log(time)
     axios.post(`${backEndIP}/routes/api/calendars/SpecificTime`,{time,currentHour})
     .then((res) => {
       //if(res.data.status ==="Outside the office") window.location.href=`http://192.168.1.11/screen4`
      if(res.data.status ==="Outside the office") window.location.href=`http://192.168.8.102/screen4`
    })
    .catch((err) =>{
      alert(err)
     console.log(err)
    })
     setInterval(this.requestRendering.bind(this), 600000);
    
     }

render()
{
    return ( 
        <div>
        <img src={logo} className="App-logo" alt="logo" width={575} height={290} />
        </div>
    )
}
}
export default SplashScreen;