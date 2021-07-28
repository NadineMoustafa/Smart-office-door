
import React  from 'react';
import {Form,Button,Col,Row,Card} from 'react-bootstrap';

import axios from 'axios';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
//const backEndIP= 'http://192.168.1.11:3333'
const backEndIP= 'http://192.168.8.102:3333'
class Screen1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    name:"Unknown",
    img:"",
    infoAboutRequest:"Asking about bachelor"
    }
    this.onSubmit=this.onSubmit.bind(this)
    this.makeRequest=this.makeRequest.bind(this)
  }
    //requests = [ "Asking about Bachelor", "Asking about Midterm", "Asking about Quiz", "Asking about Final" ];
    componentDidMount(){
      this.getImage()
      //console.log(this.state.img)
      //console.log(this.props.match.params.URLName)
    setInterval(this.changeScreen.bind(this), 60000);

  }
changeScreen(){
    //window.location.href=`http://192.168.1.11`
    window.location.href=`http://192.168.8.102`

}

    onChange = (e)=>{
      e.preventDefault();
      this.setState({[e.target.name]:e.target.value})
    }
    makeRequest(event){
     this.setState({infoAboutRequest:event.currentTarget[""+event.currentTarget.selectedIndex].label})     
    }
    onSubmit(){

      axios.post(`${backEndIP}/routes/api/requests/`,{infoAboutRequest:this.state.infoAboutRequest,userName:this.state.name,oldName:this.props.match.params.URLName})
      .then((res) => {
       swal({
         title: "Good job!",
         text: "Your request has been created successfully!",
         icon: "success",
         button: "Aww yess!",
         });   
     })
     .catch((err) =>{
      alert(err)
      console.log(err)
     })
  axios.post("http://192.168.8.102:5000/"+this.state.name)
       .then((res) => {
	console.log(res.data)
	//window.location.href="http://192.168.8.102/Screen1/"+res.data.name
          //this.setState({status:res.data.status}) 
			})
      .catch((err) =>{
        alert(err)
       console.log(err)
      })

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
    getLoginStyle() {
      return {
        marginRight:'50%'
  
      }
    } 
    render() {
    let image= this.state.img.length ===0?<div style={{marginLeft:"50%"}}> <ReactLoading type="spinningBubbles" color='#00000'  /></div> :<img src={`data:image/jpg;base64,${this.state.img}`} alt='wait it will come soon'  style={{borderRadius: (15, 50, 30, 5)}} height={225} width={180}/>
        return (
          <div style={{ paddingTop:'10%' }} >
<Card
      bg="light"
      style={{ width: '90%'  ,marginLeft:'5%' ,padding:'8%'  }}
    >
<Row style={{marginBottom:'5px'}}>
<Col sm={8}></Col>
<Col sm={4}> {image}</Col>    
          </Row>               
 <Form onSubmit={this.onSubmit}> 

 <Form.Group as={Row} >
    <Form.Label column sm="2"><b>Name </b>
    </Form.Label>
    <Col sm="10">
    <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
    </Col>
  </Form.Group>

  <Row style={{marginBottom:'5px'}}>
<Col sm={8}> <Form.Group controlId="exampleForm.SelectCustomSizeLg">
    <Form.Control as="select" size="lg" custom onChange={this.makeRequest}>
      <option>Asking about bachelor</option>
      <option>Asking about Midterm</option>
      <option>Asking about Final</option>
      <option>Asking about Quiz</option>
      <option>Asking about something in specific course</option>
    </Form.Control>
  </Form.Group></Col>
<Col sm={4}> <Button style={{marginLeft:10}}  variant="dark" type="submit">
   Submit 
 </Button></Col>    
  </Row>
 
</Form>
</Card>
</div>  
        )}
}
export default Screen1;


