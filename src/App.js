import React from "react";
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./styles.css";
import AuditForm from "./AuditForm";
import LoginPage from "./LoginPage";
import ChangePassword from "./ChangePassword";

const App = () => {
  const [userData, setUserData] = useState({IsDefault: "default"});
  console.log(userData)
  const handleUserAuthenticated =(userData)=>{
    // console.log(userData);
    setUserData(userData);
  }



  return (
    <Router>   
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {userData.IsDefault === "False" && <Link to="/audit-form">Audit Form</Link> }
            </li>
            <li>
              {userData.IsDefault === "False"? <Link to="/logout" onClick={() => setUserData({IsDefault: "default"})}>Logout</Link>:<Link to="/login">Login</Link>}
              {/* <Link to="/login">Login</Link> */}
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} />
          </Route>
          <Route path="/change-password">
            <ChangePassword userData = {userData}/>
          </Route>
          <Route exact path={"/audit-form"}  >
            <AuditForm userData = {userData}/>
          </Route>
          <Route path="/">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} />
          </Route>
        </Switch>

      </div>
    
   </Router>



  );
};

export default App;
