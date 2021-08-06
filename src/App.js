import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./styles.css";
import AuditForm from "./AuditForm";
import LoginPage from "./LoginPage";





const App = () => {
  const [userData, setUserData] = useState(null);

  const handleUserAuthenticated =(userData)=>{
    setUserData(userData)


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
              {userData !== null && <Link to="/audit-form">Audit Form</Link>  }
              
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginPage onUserAuthenticated = {handleUserAuthenticated} />
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
