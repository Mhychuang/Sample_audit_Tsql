import React from "react";
import { useState } from "react";
//BrowserRouter as Router,
//HashRouter as Router,
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,

} from "react-router-dom";

import "./styles.css";
import AuditForm from "./AuditForm"; //it will look at index.js same as from "./AuditForm/index"  "./AuditForm/AuditForm"
import BallotReconciliation from "./BallotReconciliation";
import LoginPage from "./LoginPage";
import ChangePassword from "./ChangePassword";
import Cookies from 'js-cookie';
import { clearCookiesInterval, setLoginCookies } from './loginCookies';
import { env } from "./variables";
 
function initUserData (){
  const userDataCookies = Cookies.get('userData')
  return userDataCookies === undefined ? {} : JSON.parse(userDataCookies)
}

function Logout(props) {
  const history = useHistory();
  props.onLogout();
  history.replace('/login');
  return null;
}

const App = () => {
  const [userData, setUserData] = useState(initUserData());
  const [countyId, setCountyId] = useState();
  console.log('user data',userData)

  const handleUserAuthenticated =(userData)=>{
    // console.log(userData);
    setUserData(userData);
    //setLoginCookies(userData);
  }

  const handleLogout = () => {
    clearCookiesInterval();
    setUserData({});
    Cookies.remove('userData');
  }

  const handleOnselect = (countyIdValue) =>{
    //setCountyId({CountyId: countyIdValue})
    setUserData({CountyId: countyIdValue})
  }

  const fileurl = `${env.apiUrl}files/User-Manual.docx`
  //<a href='https://sampleaudit.ncsbe.gov/files/User-Manual.docx' download>User-Manual</a>

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              {userData.IsDefault === "False" && <Link to="/audit-form">Audit Form</Link> }
            </li>
            {/* <li>
              {userData.IsDefault === "False"? <Link to="/logout">Logout</Link>:<Link to="/login">Login</Link>}
            </li> */}
            <li>
              {<Link to="/">County Selection</Link> }
            </li>
            <li>
            <a href={`${env.apiUrl}files/User-Manual.docx`} download>User-Manual</a>
            
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
         
        <Switch>
          <Route exact path="/login">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} onSelect = {handleOnselect}/>
          </Route>
          <Route exact path="/logout">
            <Logout onLogout={handleLogout} />
          </Route>
          <Route path="/change-password">
            <ChangePassword userData = {userData}/>
          </Route>
          <Route exact path={"/audit-form"}  >
            {<AuditForm userData = {userData}/>}
            {/* {userData.IsDefault ? <AuditForm userData = {userData}/> : <Redirect to = '/login'/> } */}
          </Route>
          <Route exact path={"/Ballot-Reconciliation"}  >
            {<BallotReconciliation userData = {userData}/>}
            {/* {userData.IsDefault ? <AuditForm userData = {userData}/> : <Redirect to = '/login'/> } */}
          </Route>

          <Route path= "/">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} onSelect = {handleOnselect} />
          </Route>
        </Switch>
     
       

      </div>
      </Router>

      
    




  );
};

export default App;
