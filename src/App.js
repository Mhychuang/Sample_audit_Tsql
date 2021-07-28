import React from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
//import Select from "react-select";
import MaterialTable from "material-table";
import { Grid, Button } from "@material-ui/core";
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
    DateOfCount: Date.now(),
    TimeOfCount: Date.now(),
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


  const emptySampleCandidate = {
    SampleId: "",
    CountyId: "",
    CandidateName1: "",
    CandidateName2: "",
    //to update
    Machine1: "",
    HandToEye1: "",
    DifferenceInCount1: "",
    Machine2: "",
    HandToEye2: "",
    DifferenceInCount2: ""
  }

  const [sampleCandidate, setSampleCandidate] = React.useState({
    ...emptySampleDetail
  });

  const [selectedSampleId, setSelectedSampleId] = useState('');

  const [candidateData, setCandidateData] = useState([]);


  const [formInfo, setFormInfo] = useState({

    submitted: false

  })

  async function getCounty() {
    const response = await axios.get("http://localhost:4000/allCounty");
    const data = await response.data; //.json();
    console.log(data);

    setCountyOptions({ selectOptions: data });
  }



  React.useEffect(() => {
    getCounty();
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
    const response = await axios.get(
      `http://localhost:4000/getCandidateByCountySampleId/${countyId}/${sampleId}`
    );
    let data = await response.data;
    setCandidateData(data);

    console.log("candidate", data);
  };


  const updateCandidate = async (newData, canId, putbody) => {
    const res = await axios.put(`http://localhost:4000/updateCandidate/${canId}`, putbody);

    console.log('put response', res)
    console.log('candidate Data', candidateData)
    let updateDate = candidateData
    let objIndex = updateDate.findIndex((obj => obj.CandidateId == newData.CandidateId));
    updateDate[objIndex].Machine = newData.Machine
    updateDate[objIndex].HandToEye = newData.HandToEye
    updateDate[objIndex].DifferenceInCount = newData.DifferenceInCount
    setCandidateData(updateDate)
  }

  const updateSample = async (CountyId, SampleID, putbody) => {
    console.log('updatFunction', putbody);
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

  const handleSubmit = (e) => {

    setFormInfo({ submitted: true }, () => {
      setTimeout(() => setFormInfo({ submitted: false }), 500);


    });
    console.log('Final_sampleDetail', sampleDetail.CountyId)
    updateSample(sampleDetail.CountyId, sampleDetail.SampleID, sampleDetail)
  }

  var title = <h1>Sample Audit Record</h1>;


  const columns = [
    {
      title: "Candidate Name", field: "CandidateName", editable: 'never',
      //validate: rowData => rowData.name === undefined || rowData.name === "" ? "Required" : true 
    },
    {
      title: "Machine", field: "Machine",
      //validate: rowData => rowData.email === undefined || rowData.email === "" ? "Required" : true
    },
    {
      title: "Hand-To-Eye", field: "HandToEye",
      //validate: rowData => rowData.year === undefined || rowData.year === "" ? "Required" : true
    },
    {
      title: "Difference In Count", field: 'DifferenceInCount',
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
    console.log('all', sampleDetail)
    console.log('Time', sampleDetail.TimeOfCount.toString())
  }, [sampleDetail]);


  //for select
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
    title: {
      textAlign: "center",
      fontSize: 15,
      color: "blue",
      fontWeight: 600,
      margin: 0,
      padding: 0,
    },
    textBox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
      
    },
    formBox:{
      border: "1px solid grey"
    },
    entireForm: {
      padding: 20
    }
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

    <div className={classes.entireForm}>
      <Grid container justifyContent='center' >
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


      <Grid container spacing={1} justifyContent='center'>

        <Grid item md={2}>
          <Cards cardName={'Election Date'} CardValue={sampleDetail.ElectionDate.toString().substring(0, 10)} />
        </Grid>
        <Grid item md={2}>
          <Cards cardName={'Contest Name'} CardValue={sampleDetail.ContestName} />
        </Grid>
        <Grid item md={2}>
          <Cards cardName={'Type Of Sample'} CardValue={sampleDetail.TypeOfSample} />
        </Grid>
        <Grid item md={2}>
          <Cards cardName={'Precinct Site Name'} CardValue={sampleDetail.PrecinctSiteName} />
        </Grid>
      </Grid>


      <Grid container spacing={1} justifyContent='center'>
              <Grid item xs ={12}>
        <SimplePaper></SimplePaper>
        </Grid>
      </Grid>

      {/* form starts here */}
      <Grid container spacing={2} justifyContent='center'  className = {classes.formBox}>

        <Grid item xs={12} className = {classes.title}>
          Title
        </Grid>
        <Grid container item xs={12}>


          <Grid item xs={6} style={{ borderRight: "1px solid grey" }}>
            <Typography className={classes.title}>Select data and time</Typography>
            <DatePickers onDateChange={handleDateChange} onTimeChange={handleTimeChange}
              selectedDate={sampleDetail.DateOfCount} selectedTime={sampleDetail.TimeOfCount} />
          </Grid>

          <Grid item xs={6} >
            <Typography className={classes.title}>Voting equipment used for this sample</Typography>
            <CheckboxLabels onCheckBoxChange={handleCheckbox} list={sampleDetail.VotingEquipmentUsed}>
            </CheckboxLabels>
          </Grid>

          <Grid container item xs={6}   >
            <Grid item>
              <Typography className={classes.title}>Time necessary to complete this count (not BOTH counts)</Typography>
            </Grid>


            <Grid item spacing={0} direction="column" alignItems="center" justify="center">
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">Hr</InputAdornment>,
                  inputProps: { min: 0, max: 30 },
                }}
                //required
                type="number"
                id="filled-required"
                defaultValue="2.5"
                //variant="filled"
                onChange={handleHourInput}
              />
            </Grid>
          </Grid>

          <Grid container item xs={6} >
            <Grid item>
              <Typography className={classes.title}>Cost or estimated cost of this count (not BOTH counts)</Typography>
            </Grid>

            <Grid item spacing={0} direction="column" alignItems="center" justify="center">
              <TextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: { min: 0, max: 30 },
                }}
                //required
                type="number"
                id="filled-required"
                defaultValue="2.5"
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
            // data = {[
            //   {"CandidateName":"Alamance1","Machine":190,"HandToEye":0,"DifferenceInCount":0},
            //   {"CandidateName":"Alamance2","Machine":168,"HandToEye":0,"DifferenceInCount":0},
            // ]}
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
                let putbody = {
                  "CandidateId": newData.CandidateId,
                  "Machine": newData.Machine,
                  "HandToEye": newData.HandToEye,
                  "DifferenceInCount": newData.DifferenceInCount
                }
                //Promise.then() takes two arguments, a callback for success and another for failure.
                //Both are optional, so you can add a callback for success or failure only.
                // here response can be any word 
                updateCandidate(newData, canId, putbody).then(response => { resolve() });

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
                // //why resolve here. will not wait for axios
                // //resolve()
              }),
            }}
          />
        </Grid>


        <Grid container item xs={12}  justifyContent='center'>
          <Grid item xs={12}>
            <Typography>Explanation of any difference (skip this section if there was no difference in any totals)</Typography>
          </Grid>

          <Grid item xs={12}>
            <RadioGroup aria-label="anonymous" name="gender1" row style={{ border: "1px solid grey" }} onChange={handleRadio}>
              If there is a difference, is it attributable to machine error or human error?
              <FormControlLabel value="Machine" control={<Radio />} label="Machine error" />
              <FormControlLabel value="Human" control={<Radio />} label="Human error" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <form className={classes.textBox} noValidate autoComplete="off">

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

        </Grid>

        <Grid item xs={12} justifyContent = 'center'>
          <form className={classes.textBox} noValidate autoComplete="off">

            <TextField
              id="outlined-multiline-static"
              label="Who conducted the count (must consist of multiple persons of different party affiliation)"
              multiline
              rows={5}
              defaultValue="Name, party affiliation"
              variant="outlined"
              onChange={handlePeople}
            />

          </form>
        </Grid>

        <Grid item spacing={1} justifyContent='center'>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={formInfo.submitted}
          >
            {
              (formInfo.submitted && 'Your form is submitted!')
              || (!formInfo.submitted && 'Submit')

            }
          </Button>
        </Grid>



      </Grid>

    </div>
  );
};

export default App;
