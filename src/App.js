import React from "react";
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import "./styles.css";
import AuditForm from "./AuditForm";
import LoginPage from "./LoginPage";
import ChangePassword from "./ChangePassword";
import Cookies from 'js-cookie';
import { setLoginCookies } from './loginCookies';
 
function initUserData (){
  const userDataCookies = Cookies.get('userData')

  return userDataCookies === undefined ? {} : JSON.parse(userDataCookies)
}

const App = () => {
  const [userData, setUserData] = useState(initUserData());

  console.log('user data',userData)
  const handleUserAuthenticated =(userData)=>{
    // console.log(userData);
    setUserData(userData);
    setLoginCookies(userData);
  }



  const handleLogout = ()=>{
    setUserData({});
    Cookies.remove('userData')

  }

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
            <li>
              {userData.IsDefault === "False"? <Link to="/logout" onClick={handleLogout}>Logout</Link>:<Link to="/login">Login</Link>}
            </li>
            <li>
            <a href='http://localhost:4000/files/User-Manual.docx' download>User-Manual</a>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} />
          </Route>
          {/* {hasCookiesExpired() && <Redirect to  = "/login" />  } */}
          <Route path="/change-password">
            <ChangePassword userData = {userData}/>
          </Route>
          <Route exact path={"/audit-form"}  >
            <AuditForm userData = {userData}/>
          </Route>
          <Route path= "/">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} />
          </Route>
        </Switch>

      </div>
    
   </Router>



  );
};

export default App;
