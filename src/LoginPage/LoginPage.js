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



import { authenticateUser } from './api';

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
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
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

    if (userData === "Email not in the system") {
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
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} Validate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handlePassword}
        />
 
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}

        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item type="button" onClick={handleOpen}>
            <Link href="#" variant="body2">
            Forgot password?
            </Link>

            {/* <button type="button" onClick={handleOpen}>
            Forgot password?
            </button> */}

          </Grid>

        </Grid>
      </form>


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