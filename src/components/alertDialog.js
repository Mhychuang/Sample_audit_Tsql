import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Countdown from 'react-countdown';
import { useHistory } from "react-router";
import { setLoginCookies } from "../loginCookies";



export default function AlertDialog(props){
    const history = useHistory();
   
    const [close, setClose] = useState('true')

 
  
    const handleLogout = () => {
        //props.onclose()
        
        history.replace('/logout')
    };
  
  
    const handleStay = () => {
        setLoginCookies(props.userData)
        setClose('false')
      
    };
  
  
    const renderer = ({   seconds }) => {
      return (
        <span>
         Seconds: {seconds}
        </span>
      )
    };

    return(


        <Dialog
        open={props.open}
        onClose={()=>'true'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your login expried."}
        </DialogTitle>


        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to stay login?
          </DialogContentText>

          <Countdown date={Date.now() + 20000}
        renderer={renderer}
        onComplete = {handleLogout}
        >
       </Countdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Stay
          </Button>
        </DialogActions>
      </Dialog>


    )




}