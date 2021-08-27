import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Countdown from 'react-countdown';



export default function AlertDialog(props){


    const [alertDialog, setAlertDialog ]= useState(false)

    const handleClickOpen = ()=>{
      setAlertDialog(true)
    }
  
    const handleClose = () => {
      setAlertDialog(false)
    };
  
  
    const handleAgree = () => {
      console.log("I agree!");
      
    };
  
    const handleDisagree = () => {
      console.log("I do not agree.");
  
    };
  
    const renderer = ({   seconds }) => {
      return (
        <span>
         Seconds: {seconds}
        </span>
      )
    };

    return(







    )








}