import React from 'react';
import { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



import { authenticateUser, getAllCounty, getAppList, getCountyApps } from './api';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.ncsbe.gov/">
        NCSBE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LoginPage(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [selectedCounty, setSelectedCounty] = useState();

  const [selectedApp, setSelectedApp] = useState();

  const [counties, setCounties] = useState();

  const [appLists, setAppLists] = useState();

  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    //console.log('conties data from hook',counties[0].label)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  const classes = useStyles();



  // for county drop down
  const getAllCountyFromAPI = async () => {
    let response = await getAllCounty();
    console.log(response)

    setCounties(response.data);
    console.log(counties)
  }


  //for appLists drop down

  const getAppListFromAPI = async () => {
    let respsone = await getAppList();
    console.log('appList', respsone)

    //setAppLists(respsone.data)


  }

  React.useEffect(() => {
    getAllCountyFromAPI()
    getAppListFromAPI()
    console.log('conties data from hook', counties)
    window.localStorage.removeItem('votingDate');
    

  }, []);

  React.useEffect(() => {
    console.log(counties);
    console.log(appLists);
    window.localStorage.removeItem('votingDate');

  }, [appLists])


  const handleCountySelect = async (e) => {


    setSelectedCounty(e.target.value)
    let appList = await getCountyApps(e.target.value)
    console.log(appList)
    setAppLists(appList)
  }

  const handleAppSelect = (e) => {
    setSelectedApp(e.target.value)
  };

  const handleChange = (e) => {
    //alert (e.target.value)
    //console.log(e.target)
    props.onSelect(e.target.value);

    //history.push('/audit-form')

  }


  const goHandler = () => {
    //selectedCounty 
    console.log(selectedCounty);
    console.log(selectedApp);

    if (selectedCounty == undefined) {
      alert("Please select a county");
    }

    if (selectedApp == undefined) {
      alert("Please select an app");
    }

    if (selectedApp == 'Sample Audit'){
      props.onSelect(selectedCounty);

      history.push('/audit-form')
    }

    else if  (selectedApp == 'Ballot Reconciliation'){
      props.onSelect(selectedCounty);

      history.push('/Ballot-Reconciliation')
    }




  }



  const handleLogin = async () => {
    //get data through API and vrify login
    if (!email) { alert("please enter email") }
    if (!password) { alert("please enter password") }


    // props.onUserAuthenticated({
    //   IsDefault: "False",
    //   CountyId: 1
    // });
    // history.push('/audit-form');
    // return;

    const userData = await authenticateUser(email, password);

    if (userData === "Account not in the system") {
      alert(userData)
    }
    else if (userData === "login fail") {
      alert("Wrong Password")
    }
    else {
      //Successful login


      if (userData.IsDefault === 'True') {
        props.onUserAuthenticated(
          //webUserId: userData.WebUserId
          userData
        );



        history.push('/change-password')
      } else {
        console.log(userData.CountyId)

        props.onUserAuthenticated(
          //webUserId: userData.WebUserId
          userData
        );
        history.push('/audit-form')
      }
    }



  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar> */}
        <Typography component="h1" variant="h5">
          Please select county and application.
        </Typography>

        <FormControl className={classes.formControl}>


          <InputLabel id="demo-simple-select-helper-label">County</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            //value={age}
            //onChange={handleChange}
            onChange={handleCountySelect}

          >
            {counties && counties.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>


          <FormHelperText>Please select your county</FormHelperText>




        </FormControl>


        <FormControl className={classes.formControl}>


          <InputLabel id="demo-simple-select-helper-label">Application</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            //value={age}
            onChange={handleAppSelect}
          >
            {appLists && appLists.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>


          <FormHelperText>Please select application.</FormHelperText>

        </FormControl>

        <Button variant="outlined" color="primary" onClick={goHandler} >
          GO

        </Button>






      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        // closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper2}>
            <h2 >Forget Password?</h2>
            <p >Please send a help desk ticket to </p>
            <p >HelpRequest.SBOE@ncbse.gov</p>
            <p >to rest your password </p>
          </div>
        </Fade>
      </Modal>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}