import React ,{Component}from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Screen1 from './components/Pages/Screen1'
import Screen2 from './components/Pages/Screen2'
import Screen3 from './components/Pages/Screen3'
import Screen4 from './components/Pages/Screen4'
import SplashScreen from './components/Pages/SplashScreen'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    return (
      <div className="App">
        <Router>
               <Route exact path="/screen1/:URLName" component={Screen1} />
               <Route exact path="/" component={Screen2} />
               <Route exact path="/screen3/:URLName" component={Screen3} />
               <Route exact path="/splash" component={SplashScreen} />
               <Route exact path="/requests" component={Screen4} />
        </Router>

      </div>
    );
  }
}



export default App;
