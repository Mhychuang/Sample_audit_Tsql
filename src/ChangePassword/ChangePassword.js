import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
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
import axios from "axios";

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


const updatePassword = async (webUserId, password) => {
  //console.log('updatFunction', putbody);
  let putbody = {
    "WebUserId": webUserId,
    "UserPassword": password
  }
  const res = await axios.put(`http://localhost:4000/auth/updateWebUser`, putbody);
}



export default function ChargePassword(props) {
  const classes = useStyles();
  const history = useHistory();

  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [webUserId, setWebUserId] = useState();

  //setWebUserId(props.userData.WebUserId)

  const handleNew = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value)
  }

  React.useEffect(() => {
    setWebUserId(props.userData.WebUserId)

  }, []);


  const handleChangePassword = () => {
    //ev.preventDefault()
    if (newPassword === confirmPassword) {
      //props.onPasswordChanged();
      //console.log(props.userData.WebUserId) 
      alert(webUserId)
      updatePassword(webUserId, newPassword)

      history.push('/login');
    } else {
      alert("Passwords don't match")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="New Password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleNew}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Confirm Password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleConfirm}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}