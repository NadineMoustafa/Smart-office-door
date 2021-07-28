
import React from 'react';
import {Form,Card,Col,Row} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
//const backEndIP= 'http://192.168.1.11:3333'
const backEndIP= 'http://192.168.8.102:3333'
class Screen3 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        name:'Unknown',
        img:"",
        lastMeetingInfo:"",
        lastMeetingTiming:""
        

        }
      }
  componentDidMount(){

    this.getImage()
    axios.post(`${backEndIP}/routes/api/users/HistoryOfTheMeeting`,{name:this.props.match.params.URLName})

    .then((res) => {
      this.setState({name:res.data.data.name,lastMeetingInfo:res.data.data.lastMeetingInfo,lastMeetingTiming:res.data.data.lastMeetingTime})
   })
   .catch((err) =>{
    console.log(err)

   })
    setInterval(this.changeScreen.bind(this), 60000);

  }
changeScreen(){
    //window.location.href=`http://192.168.1.11/splash`
    window.location.href=`http://192.168.8.102/splash`
}
  getImage(event)
    {
      axios.post(`${backEndIP}/routes/api/users/FaceEncode`,{name:this.props.match.params.URLName})

       .then((res) => {
         this.setState({name:res.data.data.name,img:res.data.data.img})
       //console.log(res.data) 
			})
      .catch((err) =>{
       console.log(err)
      })
      
        
    }

render()
{
  let image= this.state.img.length ===0?<div style={{marginLeft:"50%"}}> <ReactLoading type="spinningBubbles" color='#00000'  /></div> :<img src={`data:image/jpg;base64,${this.state.img}`} alt='wait it will come soon'  style={{borderRadius: (15, 50, 30, 5)}} height={140} width={160}/>

    return ( 
      <div style={{ paddingTop:'2%' }} >
      <Card
      bg="light"
      style={{ width: '90%'  ,marginLeft:'5%' ,padding:'5%'  }}
    >

             
<Row style={{marginBottom:'5px'}}>
<Col sm={8}></Col>
<Col sm={4}> {image}</Col>    
          </Row>   
    
    <Form onSubmit={this.onSubmit}> 
    <Form.Group as={Row} >
      <Form.Label column sm="2"><b>Name</b> </Form.Label>
    <Col sm="10"> <p>  {this.state.name}  </p> </Col>
  </Form.Group>
  <Form.Group as={Row} >
      <Form.Label column sm="2"><b>About last Meeting</b> </Form.Label>
    <Col sm="10"> <p> {this.state.lastMeetingInfo}  </p></Col>
  </Form.Group>
  <Form.Group as={Row} >
      <Form.Label column sm="2"><b>Last meeting timing</b> </Form.Label>
    <Col sm="10"> <p> {this.state.lastMeetingTiming} </p> </Col>
  </Form.Group>

</Form>
</Card>
</div>
    )
}

}



export default Screen3;