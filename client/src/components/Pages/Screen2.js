
import React from 'react';
import {Button,Card} from 'react-bootstrap';
import axios from 'axios';
//const backEndIP= 'http://192.168.1.11:3333'
const backEndIP= 'http://192.168.8.102:3333'

class Screen2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        status:"Available"
        }
      }
  componentDidMount(){
    var tempDate = new Date();
    var day =   tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' +tempDate.getDate()
    var hour =  tempDate.getHours()
    
    axios.post(`${backEndIP}/routes/api/calendars/SpecificTime`,{day,hour})
       .then((res) => {
          this.setState({status:res.data.status}) 
			})
      .catch((err) =>{
        alert(err)
      // swal({
      //   title: "So Sorry!",
      //   icon: "danger",
			// 	button: "Sorry :}!",
      // })
       console.log(err)
      })
  }

onClick = (e)=>{
    e.preventDefault();
    axios.post("http://192.168.8.100:5000/trial")

       .then((res) => {
	//console.log(res.data.name)
	//window.location.href="http://192.168.1.11/Screen1/"+res.data.name
	window.location.href="http://192.168.8.102/Screen1/"+res.data.name
          //this.setState({status:res.data.status}) 
			})
      .catch((err) =>{
        alert(err)
       console.log(err)
      })

  }
    


render()
{
 
    return ( 
      <div style={{ paddingTop:'10%' }} >
      <Card
      bg="light"
      style={{ width: '90%'  ,marginLeft:'5%' ,padding:'8%'  }}
    >
      <h1>{this.state.status} </h1>
      <h5> What do you need? please choose</h5>
      <Button onClick={this.onClick } variant="info">
        Click
      </Button>
    </Card>
    </div>  
    )
}

}



export default Screen2;