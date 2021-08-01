import React from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
//import Select from "react-select";
import MaterialTable from "material-table";
import { Grid, Button, Fade } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { forwardRef } from 'react';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Collapse from "@material-ui/core/Collapse";


//components
import DatePickers from './components/timepicker';
import CheckboxLabels from './components/checkboxs';
import Cards from './components/infoCards';
import SimplePaper from './components/simplePaper';

const App = () => {
  const [countyOptions, setCountyOptions] = React.useState({
    selectOptions: [],
    id: "",
    name: ""
  });

  const [sampleOptions, setSampleOptions] = useState({
    sampleOptionsList: [],
    countyId: ""
  });

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
    DateOfCount: null,
    TimeOfCount: null,//Date.now(),
    VotingEquipmentUsed: [],
    HumanOrMachineError: "",
    DifferenceExplanation: "",
    PeoplePartyCounting: "",
    TotalTime: "",
    CostOfCount: ""

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
  })

  const [selectedSampleId, setSelectedSampleId] = useState('');

  const [candidateData, setCandidateData] = useState([]);


  const [formInfoSubmitted, setFormInfoSubmitted] = useState(false)

  const [submitButtonLabel, setSubmitButtonLabel] = useState('Submit')


  async function getCounty() {
    const response = await axios.get("http://localhost:4000/allCounty");
    const data = await response.data; //.json();
    console.log(data);

    setCountyOptions({ selectOptions: data });
  }



  React.useEffect(() => {
    getCounty();
    console.log(!sampleDetail.HumanOrMachineError)
  }, []);

  React.useEffect(() => { }, [sampleOptions]);



  const getSampleByCounty = async (countyId) => {
    const response = await axios.get(
      `http://localhost:4000/getSampleIdByCounty/${countyId}`
    );
    const data = await response.data;
    // const options = data.map((d) => ({
    //   value: d.SampleId,
    //   label: d.SampleId
    // }));
    // options.unshift({value:'', label:''})


    setSampleOptions({
      sampleOptionsList: data,
      countyId: countyId
    });



    setSampleDetail({ ...emptySampleDetail })


  };

  const getdataByCountyandsample = async (countyId, sampleId) => {
    const response = await axios.get(
      `http://localhost:4000/getDetailByCountySampleId/${countyId}/${sampleId}`
    );
    let data = await response.data;

    setSampleDetail({
      ...sampleDetail,
      CountyId: countyId,
      SampleID: data.SampleId,
      ElectionDate: data.ElectionDate,
      TypeOfSample: data.TypeOfSample,
      PrecinctSiteName: data.PrecinctSiteName
    });

    console.log("data", data);
  };




  const getCandidateByCountyandsample = async (countyId, sampleId) => {
    try {
      const response = await axios.get(`http://localhost:4000/getCandidateByCountySampleId/${countyId}/${sampleId}`);
      let data = await response.data;
      setCandidateData(data);
    } catch (error) {
      console.error(error)
    }
  };


  const updateCandidate = async (newData, canId, putbody) => {
    const res = await axios.put(`http://localhost:4000/updateCandidate/${canId}`, putbody);
    let updateData = [...candidateData]
    let objIndex = updateData.findIndex((obj => obj.CandidateId == newData.CandidateId));
    updateData[objIndex].Machine = parseInt(newData.Machine)
    updateData[objIndex].HandToEye = parseInt(newData.HandToEye)
    updateData[objIndex].DifferenceInCount = Math.abs(parseInt(newData.Machine) - parseInt(newData.HandToEye))
    setCandidateData(updateData)

  }

  const updateSample = async (CountyId, SampleID, putbody) => {
    //console.log('updatFunction', putbody);
    const res = await axios.put(`http://localhost:4000//updateSample/${CountyId}/${SampleID}`, putbody);
  }





  const handleCountySelect = (e) => {
    let countyID = e.target.value; // not e.target.value?
    console.log('countyId', countyID)
    getSampleByCounty(countyID);

    //console.log("selectedCounty2", sampleOptions.countyId);
  };

  const handleSampleSelect = (e) => {
    let countyID = sampleOptions.countyId;
    let SampleID = e.target.value; // not e.target.value?
    getdataByCountyandsample(countyID, SampleID);
    getCandidateByCountyandsample(countyID, SampleID);
    setSelectedSampleId(SampleID);
    //console.log("selectedCounty2", countyID, SampleID);
  };

  const hasError = () => {
    let showError = false
    console.log('formValidation',formValidation)
    console.log('SampleDetailTrueorNot',!sampleDetail.DateOfCount)

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
        if (formValidation [key]) showError = true;
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
        if (formValidation [key]) showError = true;
      }
    }

    return showError

  }

  const handleSubmit = (e) => {

    !sampleDetail.DateOfCount ? setFormValidation({ ...formValidation, DateOfCount: true }) : console.log('DateOfCount');
    !sampleDetail.TimeOfCount ? setFormValidation({ ...formValidation, TimeOfCount: true }) : console.log('TimeOfCount');
    sampleDetail.VotingEquipmentUsed.length === 0 ? setFormValidation({ ...formValidation, VotingEquipmentUsed: true }) : console.log('VotingEquipmentUsed');
    !sampleDetail.HumanOrMachineError ? setFormValidation({ ...formValidation, HumanOrMachineError: true }) : console.log('HumanOrMachineError');
    !sampleDetail.DifferenceExplanation ? setFormValidation({ ...formValidation, HumanOrMachineError: true }) : console.log('HumanOrMachineError');
    !sampleDetail.PeoplePartyCounting ? setFormValidation({ ...formValidation, PeoplePartyCounting: true }) : console.log('PeoplePartyCounting');
    !sampleDetail.TotalTime ? setFormValidation({ ...formValidation, TotalTime: true }) : console.log('TotalTime');
    !sampleDetail.CostOfCount ? setFormValidation({ ...formValidation, CostOfCount: true }) : console.log('CostOfCount');

    // if sampleDetail.DateOfCount 

    console.log('hasError',hasError())

    if (hasError()) {

      setFormInfoSubmitted(false)





    } else {
      updateSample(sampleDetail.CountyId, sampleDetail.SampleID, sampleDetail)
        .then(response => {
          console.log(response)
          setFormInfoSubmitted(false);
        })
        .catch(error => {
          console.log(error)
        })


      
    }










  }

  var title = <h1>Sample Audit Record</h1>;


  const columns = [
    {
      title: "Candidate Name", field: "CandidateName", editable: 'never',
    },
    {
      title: "Machine", field: "Machine", type: "numeric",



    },
    {
      title: "Hand-To-Eye", field: "HandToEye", type: "numeric",
      //validate: rowData => rowData.year === undefined || rowData.year === "" ? "Required" : true
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
    console.log('dateChange', date)
    setSampleDetail({
      ...sampleDetail,
      DateOfCount: date

    })
  }

  const handleTimeChange = (time) => {
    setSampleDetail({
      ...sampleDetail,
      TimeOfCount: time

    })
  }


  const handleCheckbox = (event) => {

    let updatedList = sampleDetail.VotingEquipmentUsed
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

  }


  const handleHourInput = (e) => {
    setSampleDetail({
      ...sampleDetail,
      TotalTime: e.target.value
    })

  }

  const handleCostInput = (e) => {
    console.log('costhandle', e.target.value)
    setSampleDetail({
      ...sampleDetail,
      CostOfCount: e.target.value
    })
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

  }

  const handlePeople = (e) => {
    console.log(e.target.value)
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

  }, [candidateData]);


  React.useEffect(() => {
    console.log('candidate', candidateData)
    console.log('sampleDetail', sampleDetail)

  }, [sampleDetail]);





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



  return (

    <Grid container className={classes.entireForm} spacing={2} >

      <Grid container item justifyContent='center' >
        {title}


        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">County</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={countyOptions.countyOptions}
            // onChange={handleChange}
            onChange={handleCountySelect}
          >

            {countyOptions.selectOptions.map((data) => (
              <MenuItem key={data.CountyId} value={data.CountyId}>
                {data.CountyName}
              </MenuItem>
            ))}



          </Select>
          <FormHelperText>First, Select County</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">SampleID</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={handleSampleSelect}
          >

            {sampleOptions.sampleOptionsList.map((data) => (
              <MenuItem key={data.SampleId} value={data.SampleId}>
                {data.SampleId}
              </MenuItem>
            ))}

          </Select>
          <FormHelperText>Then Select Sample</FormHelperText>
        </FormControl>


      </Grid>


      <Grid container item spacing={1} justifyContent='center'>

        <Grid item xs={3} md={3}>
          <Cards cardName={'Election Date'} CardValue={sampleDetail.ElectionDate.toString().substring(0, 10)} />
        </Grid>
        <Grid item md={3}>
          <Cards cardName={'Contest Name'} CardValue={sampleDetail.ContestName} />
        </Grid>
        <Grid item md={3}>
          <Cards cardName={'Type Of Sample'} CardValue={sampleDetail.TypeOfSample} />
        </Grid>
        <Grid item md={3}>
          <Cards cardName={'Precinct Site Name'} CardValue={sampleDetail.PrecinctSiteName} />
        </Grid>
      </Grid>


      <Grid container item spacing={10} justifyContent='center'>
        <Grid item xs={12} spacing={10}>
          <SimplePaper></SimplePaper>
        </Grid>
      </Grid>

      {/* form starts here */}
      <Grid container item spacing={3} justifyContent='center'>


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
                  formValidation ={formValidation} />
              </Grid>

              <Grid item xs={6} className={classes.VotingEquipmentUsed} style={{ border: "1px solid grey" }}>
                <Typography className={classes.title}>Voting equipment used for this sample</Typography>
                <CheckboxLabels onCheckBoxChange={handleCheckbox} list={sampleDetail.VotingEquipmentUsed}>
                </CheckboxLabels>
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
                    defaultValue="0.0"
                    //variant="filled"
                    onChange={handleHourInput}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={6} style={{ border: "1px solid grey" }} className={classes.cost} >
                <Grid item className={classes.title}>
                  Cost or estimated cost of this count (not BOTH counts)
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
                    defaultValue="0.0"
                    //variant="filled"
                    onChange={handleCostInput}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>

              <MaterialTable
                title="Please edit counts detail"
                columns={columns}
                data={candidateData}
                icons={tableIcons}
                options={{
                  search: false,
                  paging: false,
                  actionsColumnIndex: -1,
                }}

                editable={{
                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    //Backend call
                    let canId = oldData.CandidateId
                    //let putbody = JSON.stringify(newData)

                    let DifferenceInCount = Math.abs(parseInt(newData.Machine) - parseInt(newData.HandToEye))

                    // DifferenceInCount == 0 ? setShowExplanation('none') : setShowExplanation('block');



                    let putbody = {
                      "CandidateId": newData.CandidateId,
                      "Machine": newData.Machine,
                      "HandToEye": newData.HandToEye,
                      "DifferenceInCount": DifferenceInCount
                    }
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

            <Collapse in={showExplanation} timeout={1500}>
              <Fade in={showExplanation} timeout={500}>

                <Grid container item xs={12} justifyContent='center' >
                  {/* <Box display={showExplanation} xs={12} width={1}> */}
                  <Grid item xs={12} className={classes.title}>
                    Explanation of any difference (skip this section if there was no difference in any totals)
                  </Grid>


                  <Grid container item xs={12} style={{ border: "1px solid grey" }} >
                    <Grid item xs={8} className={classes.text} justifyContent='center'>
                      <Typography>If there is a difference, is it attributable to machine error or human error?</Typography>
                    </Grid>

                    <Grid item xs={4} justifyContent='center'>
                      <RadioGroup row onChange={handleRadio} >

                        <FormControlLabel value="Machine" control={<Radio />} label="Machine error" />
                        <FormControlLabel value="Human" control={<Radio />} label="Human error" />
                      </RadioGroup>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} className={classes.textBox}>
                    <form noValidate autoComplete="on">

                      <TextField
                        id="outlined-multiline-static"
                        label="Detailed explanation of what caused the difference"
                        multiline
                        rows={5}
                        defaultValue=""
                        variant="outlined"
                        onChange={handleExplanation}
                      />

                    </form>
                  </Grid>
                  {/* </Box> */}
                </Grid>
              </Fade>
            </Collapse>

            <Grid Container item xs={12} justifyContent='center' spacing={5}>

              <Grid item xs={12} className={classes.title}>
                Who conducted the count (must consist of multiple persons of different party affiliation)

              </Grid>

              <Grid item xs={12} className={classes.textBox}>
                <TextField

                  id="outlined-multiline-static"
                  label="Name, Party affiliation;"
                  multiline
                  rows={5}
                  //defaultValue="Name, party affiliation"
                  variant="outlined"
                  onChange={handlePeople}


                  //className={classes.textField}
                  error={formValidation.PeoplePartyCounting}
                  helperText={formValidation.PeoplePartyCounting ? 'Required' : ' '}
                />
              </Grid>


            </Grid>
                

            
            <Collapse in={hasError()} timeout={1500}>
              <Fade in={hasError()} timeout={500}>
            <Grid container item xs={12} justifyContent='center' >
              Please filled out required
            </Grid>
            </Fade>
            </Collapse>

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

export default App;
