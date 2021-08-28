import React from "react";
import { useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Grid, Button, Fade } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { forwardRef } from 'react';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Collapse from "@material-ui/core/Collapse";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//import moment from 'moment-timezone';

//for dialog
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Countdown from 'react-countdown';



//components
import DatePickers from '../components/timepicker';
import CheckboxLabels from '../components/checkboxs';
import Cards from '../components/infoCards';
import SimplePaper from '../components/simplePaper';
import { useLoginCookiesTimer } from '../loginCookies';
import AlertDialog from '../components/alertDialog'

//moment.tz.setDefault("America/New_York");


const AuditForm = (props) => {
  const [alertDialog, setAlertDialog ]= useState(false)

  
  const handleClickOpen = ()=>{

    setAlertDialog(true)
  }

  const handleClose = () => {
    setAlertDialog(false)
  };

  useLoginCookiesTimer(props.userData, handleClickOpen);

  

  const emptySampleDetail = {
    CountyId: "",
    SampleID: "",
    ElectionDate: "",
    CountyName: "",
    ContestName: "",
    TypeOfSample: "",
    PrecinctSiteName: "",
    CandidateName1: "",
    CandidateName2: "",
    //to update
    // DateOfCount: null,
    // TimeOfCount: null,//Date.now(),
    // VotingEquipmentUsed: [],
    // HumanOrMachineError: "",
    // DifferenceExplanation: "",
    // PeoplePartyCounting: "",
    // TotalTime: "",
    // CostOfCount: ""

  }



  const [sampleDetail, setSampleDetail] = React.useState({
    ...emptySampleDetail
  });

  const [showExplanation, setShowExplanation] = useState(false)


  const [formValidation, setFormValidation] = useState({
    DateOfCount: false,
    TimeOfCount: false,
    VotingEquipmentUsed: false,
    TotalTime: false,
    CostOfCount: false,
    PeoplePartyCounting: false,
    HumanOrMachineError: false,
    DifferenceExplanation: false,
    CandidatesCounts: false,

  })

//  const [radioValue, setRadioValue] = useState('Human')

  const [selectedSampleId, setSelectedSampleId] = useState('');

  const [candidateData, setCandidateData] = useState([]);


  const [formInfoSubmitted, setFormInfoSubmitted] = useState(false)

  const [submitButtonLabel, setSubmitButtonLabel] = useState('Submit')

  const [label, setLabel] = useState({
    label1: "",
    label2: " Done",
    label1Color: "warning.main",
    label2Color: "warning.main"

  })



  const getdataByCountyandsample = async (countyId, sampleId) => {
    const response = await axios.get(
      `http://localhost:4000/sampleAudit/getDetailByCountySampleId/${countyId}/${sampleId}`
    );
    let data = await response.data;
    console.log('Sample Data', data)

    let dateOfCount = String(data.DateOfCount)
    dateOfCount = dateOfCount.slice(0,-1)

    let TimeOfCount = String(data.TimeOfCount)
    TimeOfCount = TimeOfCount.slice(0,-1)


    const CostOfCount = Number(data.CostOfCount)
    const TotalTime = Number(data.TotalTime)
    const VotingArray = data.VotingEquipmentUsed.split(',');
    setSampleDetail({
      ...sampleDetail,
      CountyId: countyId,
      SampleID: data.SampleId.toString(),
      ElectionDate: data.ElectionDate,
      TypeOfSample: data.TypeOfSample,
      PrecinctSiteName: data.PrecinctSiteName,
      ContestName: data.ContestName,
      CountyName: data.CountyName,
      DateOfCount: dateOfCount,
      TimeOfCount: TimeOfCount,
      VotingEquipmentUsed: VotingArray,
      HumanOrMachineError: data.HumanOrMachineError,
      DifferenceExplanation: data.DifferenceExplanation,
      PeoplePartyCounting: data.PeoplePartyCounting,
      TotalTime: TotalTime,
      CostOfCount: CostOfCount
    });
  };

  const handleRadioButton = (e) => {
    let CountyId = sampleDetail.CountyId
    let sampleId = e.target.value
    getdataByCountyandsample(CountyId, sampleId)
    getCandidateByCountyandsample(CountyId, sampleId);
  }



  const getCandidateByCountyandsample = async (countyId, sampleId) => {
    try {
      const response = await axios.get(`http://localhost:4000/sampleAudit/getCandidateByCountySampleId/${countyId}/${sampleId}`);
      let data = await response.data;
      setCandidateData(data);
    } catch (error) {
      console.error(error)
    }
  };


  const updateCandidate = async (newData, canId, putbody) => {
    console.log('putbody', putbody)
    console.log('canId', canId)
    const res = await axios.put(`http://localhost:4000/sampleAudit/updateCandidate`, putbody);
    // console.log(newData)
    // console.log(candidateData)
    let updateData = [...candidateData]
    console.log('updateData', updateData)
    console.log('newData', newData)
    let objIndex = updateData.findIndex((obj => obj.SampleCandidateId == newData.SampleCandidateId));
    updateData[objIndex].CandidateName = newData.CandidateName
    updateData[objIndex].Machine = parseInt(newData.Machine)
    updateData[objIndex].HandToEye = parseInt(newData.HandToEye)
    updateData[objIndex].DifferenceInCount = Math.abs(parseInt(newData.Machine) - parseInt(newData.HandToEye))
    setCandidateData(updateData)
    console.log('candidate update name', updateData)

  }

  const updateSample = async (CountyId, SampleID, putbody) => {
    //console.log('updatFunction', putbody);
    const res = await axios.put(`http://localhost:4000/sampleAudit/updateSample`, putbody);
  }



  const hasError = () => {
    let showError = false
    // console.log('formValidation', formValidation)
    // console.log('SampleDetailTrueorNot', !sampleDetail.DateOfCount)
    //showExplanation
    if (showExplanation) {

      let keyList = [
        'DateOfCount',
        'TimeOfCount',
        'VotingEquipmentUsed',
        'TotalTime',
        'CostOfCount',
        'PeoplePartyCounting'
      ]

      for (var key in keyList) {
        if (formValidation[key]) showError = true;
      }

    } else {

      let keyList = [
        'DateOfCount',
        'TimeOfCount',
        'VotingEquipmentUsed',
        'TotalTime',
        'CostOfCount',
        'PeoplePartyCounting',
        'HumanOrMachineError',
        'DifferenceExplanation'
      ]

      for (var key in keyList) {
        if (formValidation[key]) showError = true;
      }
    }

    return showError

  }

  const handleSubmit = (e) => {

    //some issues here

    let newFormValidation = { ...formValidation };


    newFormValidation = !sampleDetail.DateOfCount ? { ...newFormValidation, DateOfCount: true } : newFormValidation;
    newFormValidation = !sampleDetail.TimeOfCount ? { ...newFormValidation, TimeOfCount: true } : newFormValidation;

    newFormValidation = sampleDetail.VotingEquipmentUsed.length === [""] ? { ...newFormValidation, VotingEquipmentUsed: true } : newFormValidation;
    //newFormValidation = sampleDetail.VotingEquipmentUsed[0] === "" ? { ...newFormValidation, VotingEquipmentUsed: true } : newFormValidation;


    newFormValidation = showExplanation && !sampleDetail.HumanOrMachineError ? { ...newFormValidation, HumanOrMachineError: true } : newFormValidation;
    newFormValidation = showExplanation && !sampleDetail.DifferenceExplanation ? { ...newFormValidation, DifferenceExplanation: true } : newFormValidation;
    newFormValidation = !sampleDetail.PeoplePartyCounting ? { ...newFormValidation, PeoplePartyCounting: true } : newFormValidation;
    newFormValidation = !sampleDetail.CostOfCount ? { ...newFormValidation, CostOfCount: true } : newFormValidation;
    newFormValidation = !sampleDetail.TotalTime ? { ...newFormValidation, TotalTime: true } : newFormValidation;

    let HandToEyeIsZero = candidateData.some(obj => obj.HandToEye != 0)
    let MachineIsZero = candidateData.some(objs => objs.Machine != 0)


    newFormValidation = !HandToEyeIsZero && !MachineIsZero ? { ...newFormValidation, CandidatesCounts: true } : newFormValidation;

    setFormValidation(newFormValidation)

    // if sampleDetail.DateOfCount 

    //loop throuh every properties in the obj

    console.log(newFormValidation)
    let trueCount = 0

    for (var key in newFormValidation) {
      if (newFormValidation[key]) {
        trueCount += 1
      }
    }

    console.log('before submit date', sampleDetail.DateOfCount)

    console.log('before submit time', sampleDetail.TimeOfCount)

    // didn't get the most recent formValidation
    //console.log(sampleDetail.TimeOfCount)

    //use newFormValidation



    //trueCount== 0
    if (trueCount == 0) {
      console.log(sampleDetail.SampleID)
      var labeltochange = 'label' + sampleDetail.SampleID + "Color"
      console.log(labeltochange)
      //use square bracket we can pass in string 
      setLabel({ ...label, [labeltochange]: "success.main" })

      updateSample(sampleDetail.CountyId, sampleDetail.SampleID, sampleDetail)
        .then(response => {
          console.log(response)
          setFormInfoSubmitted(false);
        })
        .catch(error => {
          console.log(error)
        })



    } else {
      alert("Please fill all required cells")
      setFormInfoSubmitted(false)

    }



  }

  var title = <h1>Sample Audit Record</h1>;


  const columns = [
    {
      title: "Candidate Name", field: "CandidateName",

    },
    {
      title: "Machine", field: "Machine", type: "numeric",



    },
    {
      title: "Hand-To-Eye", field: "HandToEye", type: "numeric",
      //validate: rowData => rowData.year === undefined || rowData.year === "" ? "Required" : true
      //helperText:'Invalid Email'

    },
    {
      title: "Difference In Count", field: 'DifferenceInCount', editable: 'never', type: "numeric",
      //validate: rowData => rowData.fee === undefined || rowData.fee === "" ? "Required" : true
    }]

  const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),

  }

  const handleDateChange = (date) => {

    console.log('data of count', date)

    setSampleDetail({
      ...sampleDetail,
      DateOfCount: date

    })
    setFormValidation({ ...formValidation, DateOfCount: false })
  }

  const handleTimeChange = (time) => {

    console.log('OG time of count', time)

    //console.log('dateChange', date)
    const NewTime = time.toLocaleString('en-US', { timeZone: 'America/New_York' })
    console.log('NewTime', NewTime)



    setSampleDetail({
      ...sampleDetail,
      TimeOfCount: NewTime

    })
    setFormValidation({ ...formValidation, TimeOfCount: false })
  }


  const handleCheckbox = (event) => {

    let updatedList = sampleDetail.VotingEquipmentUsed;



    if (event.target.checked) {
      updatedList.push(event.target.name)
    }
    else {
      updatedList = updatedList.filter(e => e !== event.target.name)
    }

    setSampleDetail({
      ...sampleDetail,
      VotingEquipmentUsed: updatedList
    })

    setFormValidation({ ...formValidation, VotingEquipmentUsed: false })

  }


  const handleHourInput = (e) => {
    setSampleDetail({
      ...sampleDetail,
      TotalTime: e.target.value
    })
    setFormValidation({ ...formValidation, TotalTime: false })
  }

  const handleCostInput = (e) => {
    console.log('costhandle', e.target.value)
    setSampleDetail({
      ...sampleDetail,
      CostOfCount: e.target.value
    })
    setFormValidation({ ...formValidation, CostOfCount: false })
  }

  const handleRadio = (e) => {
    setSampleDetail({
      ...sampleDetail,
      HumanOrMachineError: e.target.value
    })

  }


  const handleExplanation = (e) => {
    console.log(e.target.value)
    setSampleDetail({
      ...sampleDetail,
      DifferenceExplanation: e.target.value
    })

    setFormValidation({ ...formValidation, DifferenceExplanation: false })

  }

  const handlePeople = (e) => {
    console.log(e.target.value)
    setFormValidation({ ...formValidation, PeoplePartyCounting: false })
    setSampleDetail({
      ...sampleDetail,
      PeoplePartyCounting: e.target.value
    })
  }

  React.useEffect(() => {
    let DifferenceList = candidateData.map(a => a.DifferenceInCount);
    let hasDifference = DifferenceList.some(item => item !== 0)


    hasDifference ? setShowExplanation(true) : setShowExplanation(false)


    console.log('showExplanation', showExplanation)
    console.log('candidate data', candidateData)

  }, [candidateData]);



  React.useEffect(() => {

    console.log(props.userData.CountyId)
    let countyID = props.userData.CountyId;
    let SampleID = 1
    getdataByCountyandsample(countyID, SampleID);
    getCandidateByCountyandsample(countyID, SampleID);
    console.log(sampleDetail.sampleId)

  }, []);





  //Style
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    outerColumn: {
      borderRight: "1px solid grey",
      borderBottom: "1px solid grey",
      borderLeft: "1px solid grey"
    },
    bigTitle: {
      textAlign: "center",
      fontSize: 30,
      color: "blue",
      fontWeight: 800,
      margin: 5,
      padding: 5,
    },
    title: {
      textAlign: "center",
      fontSize: 15,
      color: "blue",
      fontWeight: 600,
      margin: 0,
      marginBottom: 5,
      padding: 0,
    },
    error: {
      textAlign: "center",
      fontSize: 18,
      color: "red",
      fontWeight: 600,
      margin: 0,
      marginBottom: 5,
      padding: 0,
    },
    text: {
      //textAlign: "left",
      fontSize: 13,
      color: "blue",
      fontWeight: 500,
      //margin: 1,
      //marginBottom: 5,
      paddingTop: 10,
      paddingLeft: 50
    },
    textBox: {
      paddingTop: 6,
      '& .MuiTextField-root': {
        margin: theme.spacing(0),
        width: '100%',
      },

    },
    formBox: {
      border: "1px solid grey",
      // margin: 20

    },
    entireForm: {
      paddingTop: 30,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingBottom: 50,
    },
    VotingEquipmentUsed: {
      paddingLeft: 15

    },
    cost: {
      padding: 15,


    },
    costInput: {
      paddingLeft: 30

    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      '& p': {
        color: 'red',
      },
    },
  }));

  const classes = useStyles();



  const defaultProps = {
    bgcolor: 'background.paper',
    // color: 'blue',
    m: 1,
    style: { width: '80%', height: "15vw" },
    borderColor: 'text.primary',
  };

   

  const renderer = ({   seconds }) => {
    return (
      <span>
      Automatically logout in {seconds} Seconds.
      </span>
    )
  };

  

  const clickFunction = () => {
    console.log('sampleDetail', sampleDetail)
    console.log('candidateData', candidateData)
    //console.log('sampleDetail.CostOfCount', sampleDetail.CostOfCount)
  }


  return (


    
    <Grid container className={classes.entireForm} spacing={2} >


      <Grid container item justifyContent='center' >
        {title}

        {/* <button onClick={handleClickOpen}> click</button> */}

        {/* <button onClick={clickFunction}> click2</button> */}




        <AlertDialog open = {alertDialog} userData = {props.userData} handleClose ={handleClose} />

        


      </Grid>

      <Grid container justifyContent='center' spacing={1}>
        {/* <FormControl component="fieldset"> */}
        {/* <FormLabel component="legend">Sample</FormLabel> */}
        {/* <Grid item xs={3}>Sample</Grid> */}
        {/* <RadioGroup aria-label="gender" name="gender1" value={sampleDetail.sampleId} onChange={handleRadioButton}> */}
        <RadioGroup aria-label="gender" name="gender1" value={sampleDetail.SampleID} onChange={handleRadioButton} row>
          {/* <Grid item ><FormControlLabel value='1' control={<Radio />} label="Sample One" /></Grid> */}
          <Box border={3} borderColor={label.label1Color} borderRadius={16} component="span" m={1} p={0} pr={1} pl={1}>
            <FormControlLabel value='1' control={<Radio />} label={<span style={{ fontSize: '120%' }}>Sample One</span>} />

          </Box>
          <Box border={3} borderColor={label.label2Color} borderRadius={16} component="span" m={1} p={0} pr={1} pl={1}>
            <FormControlLabel value='2' control={<Radio />} label={<span style={{ fontSize: '120%' }}>Sample Two</span>} />
          </Box>
        </RadioGroup>
        {/* </FormControl> */}

      </Grid>


      <Grid container item spacing={0} justifyContent='space-between' alignItems='stretch'>

        <Grid item xs >
          <Cards cardName={'County'} CardValue={sampleDetail.CountyName} />
        </Grid>

        <Grid item xs >
          <Cards cardName={'Election Date'} CardValue={sampleDetail.ElectionDate.toString().substring(0, 10)} />
        </Grid>
        <Grid item xs >
          <Cards cardName={'Contest Name'} CardValue={sampleDetail.ContestName} />
        </Grid>
        <Grid item xs >
          <Cards cardName={'Type Of Sample'} CardValue={sampleDetail.TypeOfSample} />
        </Grid>
        <Grid item xs >
          <Cards cardName={'Site Name'} CardValue={sampleDetail.PrecinctSiteName} />
        </Grid>
      </Grid>


      {/* <Grid container item spacing={10} justifyContent='center'>
        <Grid item xs={12} spacing={10}>
          <SimplePaper></SimplePaper>
        </Grid>
      </Grid> */}

      {/* form starts here */}
      <Grid container item spacing={0} justifyContent='center'>


        <Box border={1} padding={2}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={12} className={classes.bigTitle}>
              Sample Audit Form
            </Grid>

            <Grid container item xs={12}>


              <Grid item xs={6} style={{ border: "1px solid grey" }}>
                <Typography className={classes.title}>Select date and time</Typography>
                <DatePickers onDateChange={handleDateChange} onTimeChange={handleTimeChange}
                  selectedDate={sampleDetail.DateOfCount} selectedTime={sampleDetail.TimeOfCount}
                  formValidation={formValidation} />
              </Grid>

              <Grid item xs={6} className={classes.VotingEquipmentUsed} style={{ border: "1px solid grey" }}>
                <FormControl error={formValidation.VotingEquipmentUsed}>
                  <FormLabel ><Typography className={classes.title}>Voting equipment used for this sample</Typography></FormLabel>

                  <CheckboxLabels
                    onCheckBoxChange={handleCheckbox}
                    list={sampleDetail.VotingEquipmentUsed}>
                  </CheckboxLabels>

                  <FormHelperText>{formValidation.VotingEquipmentUsed ? 'Required' : ''}</FormHelperText>
                </FormControl>


              </Grid>

              <Grid container item xs={6} style={{ border: "1px solid grey" }} className={classes.cost} >
                <Grid item>
                  <Typography className={classes.title}>Time necessary to complete this count (not BOTH counts)</Typography>
                </Grid>

                <Grid item className={classes.costInput}>
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Hr</InputAdornment>,
                      inputProps: { min: 0, max: 30 },
                    }}
                    //required
                    type="number"
                    id="filled-required"
                    value={sampleDetail.TotalTime}


                    //variant="filled"
                    onChange={handleHourInput}
                    error={formValidation.TotalTime}
                    helperText={formValidation.TotalTime ? 'Required' : ''}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={6} style={{ border: "1px solid grey" }} className={classes.cost} >
                <Grid item className={classes.title}>
                  <Typography className={classes.title}> Cost or estimated cost of this count (not BOTH counts)</Typography>
                </Grid>

                <Grid item className={classes.costInput}  >
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      inputProps: { min: 0, max: 99999 },
                    }}
                    //required
                    type="number"
                    id="filled-required"

                    value={sampleDetail.CostOfCount}

                    //variant="filled"
                    onChange={handleCostInput}
                    error={formValidation.CostOfCount}
                    helperText={formValidation.CostOfCount ? 'Required' : ''}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>

              <MaterialTable
                title="Enter counts for each candidates"
                title={formValidation.CandidatesCounts ?
                  <Typography className={classes.error}>Every candidate counts is required</Typography>
                  : "Enter counts for each candidates"}
                columns={columns}
                data={candidateData}
                icons={tableIcons}

                options={{
                  search: false,
                  paging: false,
                  sorting: false,
                  actionsColumnIndex: -1,

                }}

                style={formValidation.CandidatesCounts && { border: '2px solid red' }}

                editable={{
                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

                    setFormValidation({ ...formValidation, CandidatesCounts: false })
                    //Backend call
                    let canId = oldData.SampleCandidateId
                    //let putbody = JSON.stringify(newData)

                    let DifferenceInCount = Math.abs(parseInt(newData.Machine) - parseInt(newData.HandToEye))
                    // DifferenceInCount == 0 ? setShowExplanation('none') : setShowExplanation('block');

                    let putbody = {
                      "SampleCandidateId": newData.SampleCandidateId,
                      "CandidateName": newData.CandidateName,
                      "Machine": newData.Machine,
                      "HandToEye": newData.HandToEye,
                      "DifferenceInCount": DifferenceInCount
                    }
                    console.log(putbody);
                    //Promise.then() takes two arguments, a callback for success and another for failure.
                    //Both are optional, so you can add a callback for success or failure only.
                    // here response can be any word 
                    updateCandidate(newData, canId, putbody).then(response => {
                      console.log(response)
                      resolve()
                    });

                    // axios.put(`http://localhost:4000/updateCandidate/${canId}`, putbody)
                    // .then((response, rejct) => {
                    //   let updateDate = candidateData
                    //   let objIndex = updateDate.findIndex(( obj => obj.CandidateId == newData.CandidateId));     
                    //   updateDate[objIndex].Machine = newData.Machine
                    //   updateDate[objIndex].HandToEye = newData.HandToEye
                    //   updateDate[objIndex].DifferenceInCount = newData.DifferenceInCount
                    //   setCandidateData(updateDate)

                    // resolve()

                    // });
                    // //why resolve here. will not wait for axios and we since it is a promise we need to excute the resolce. 
                    // or we can do somthing like resolve('done') but we don't know what material table is going to do with this resolve. 

                    // //resolve()
                  }),
                }}
              />
            </Grid>

            <Grid Container item xs={12} justifyContent='center' spacing={5}>
              {/* <Collapse in={showExplanation} timeout={1500}>
                <Fade in={showExplanation} timeout={500}> */}

              <Collapse in={true} timeout={1000} justifyContent='center'>
                <Fade in={true} timeout={1000} justifyContent='center'>

                  <Grid container justifyContent='center'
                    style={formValidation.DifferenceExplanation && { border: '2px solid red' }}>
                    <Grid item className={classes.title}>
                      <Typography className={classes.title}>Explanation of any difference (skip this section if there was no difference in any totals)</Typography>
                      {/* error={formValidation.PeoplePartyCounting}
                  helperText={formValidation.PeoplePartyCounting ? 'Required' : ' '} */}
                    </Grid>


                    <Grid container item xs={12} justifyContent='center' style={{ border: "1px solid grey" }} >
                      <Grid item xs={8} className={classes.text} justifyContent='center'>
                        <Typography className={classes.title}>If there is a difference, is it attributable to machine error or human error?</Typography>
                      </Grid>

                      <Grid item xs={4} justifyContent='center'>
                        <RadioGroup row onChange={handleRadio}    value= {String(sampleDetail.HumanOrMachineError)}>

                          <FormControlLabel value="Machine" control={<Radio />} label="Machine error" />
                          <FormControlLabel value="Human" control={<Radio />} label="Human error" />
                        </RadioGroup>
                      </Grid>
                    </Grid>



                    <Grid item xs={12} className={classes.textBox}>

                    <Grid item xs={12} className={classes.title}>
                <Typography className={classes.title}>Detailed explanation of what caused the difference</Typography>

              </Grid>
                      <form noValidate autoComplete="on">

                        <TextField
                          id="outlined-multiline-static"
                          // label="Detailed explanation of what caused the difference"
                          multiline
                          rows={5}
                          value = {sampleDetail.DifferenceExplanation}
                          defaultValue= ''
                          variant="outlined"
                          onChange={handleExplanation}
                        />

                      </form>
                    </Grid>

                  </Grid>
                </Fade>
              </Collapse>
            </Grid>

            <Grid Container item xs={12} justifyContent='center' spacing={5}>

              <Grid item xs={12} className={classes.title}>
                <Typography className={classes.title}>Who conducted the count (must consist of multiple persons of different party affiliation)</Typography>

              </Grid>

              <Grid item xs={12} className={classes.textBox}>
                <TextField

                  id="outlined-multiline-static"
                  //label="Name, Party affiliation;"
                  multiline
                  rows={5}
                  //defaultValue={sampleDetail.PeoplePartyCounting}
                  value={sampleDetail.PeoplePartyCounting}
                  variant="outlined"
                  onChange={handlePeople}


                  //className={classes.textField}
                  error={formValidation.PeoplePartyCounting}
                  helperText={formValidation.PeoplePartyCounting ? 'Required' : ' '}
                />
              </Grid>


            </Grid>



            {/* <Collapse in={hasError()} timeout={1500}>
              <Fade in={hasError()} timeout={500}>
                <Grid container item xs={12} justifyContent='center' >
                  Please filled out required
                </Grid>
              </Fade>
            </Collapse> */}

            <Grid item spacing={12} justifyContent='center'>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                disabled={formInfoSubmitted}
              >
                {
                  (formInfoSubmitted && 'Your form is submitted!')
                  || (!formInfoSubmitted && 'Submit')

                }
              </Button>
            </Grid>

          </Grid>

        </Box>






      </Grid>

    </Grid>
  );
};

export default AuditForm;
