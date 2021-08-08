import React from 'react';
import { useState } from "react";
import axios from "axios";
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
}));

const authenticateUser = async (email, password)=>{
    console.log(email, password)

    const response = await axios.get(
        `http://localhost:4000/auth/${email}/${password}`
      );
    
      let userData = await response.data;

      return userData;
}



export default function LoginPage(props) {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
 
    const handleEmail = (e) =>{
        console.log(e.target.value)
        setEmail(e.target.value)
        
    }
    
    const handlePassword = (e) =>{
        setPassword(e.target.value)

    }


  const classes = useStyles();

  // const history = useHistory();

  const handleLogin = (e) => {
    //get data through API and vrify login
    
   
    console.log(e)
    const userData = authenticateUser(email, password);
    // console.log('userData', userData)

    alert(userData[0])
    


    // if (userData === null){
    //     //print error message
    // }else{
    //     props.onUserAuthenticated(userData)
    //     history.push("/audit-form")

    // }


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
        <form className={classes.form} noValidate>
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
            onChange = {handleEmail}
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
            onChange = {handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick= {handleLogin}
            
          >
            Sign In
          </Button>
          <Grid container  justifyContent="flex-end">
            <Grid item >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
    
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}