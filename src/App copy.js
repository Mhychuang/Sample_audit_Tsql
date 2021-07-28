import React from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import MaterialTable from "material-table";
import {Grid, Button} from "@material-ui/core";
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
//import Select from '@material-ui/core/Select';


//components
import DatePickers from './components/timepicker';
import CheckboxLabels from './components/checkboxs';
import Cards from './components/infoCards';

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
    SampleID: "",
    ElectionDate: "",
    CountyName:"",
    ContestName: "",
    TypeOfSample: "",
    PrecinctSiteName: "",
    CandidateName1: "",
    CandidateName2: "",
    //to update
    DateOfCount: Date.now(),
    TimeOfCount: Date.now(),
    VotingEquipmentUsed: "",
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

  const [candidateData, setCandidateData] = useState([])

  async function getCounty() {
    const response = await axios.get("http://localhost:4000/allCounty");
    const data = await response.data; //.json();
    //console.log(data);

    const options = data.map((d) => ({
      value: d.CountyId,
      label: d.CountyId + " " + d.CountyName
    }));

    // push to the array
    //setItems({selectOptions: [...items.selectOptions, options]});
    setCountyOptions({ selectOptions: options });
  }

  React.useEffect(() => {
    getCounty();
  }, []);

  React.useEffect(() => {}, [sampleOptions]);

  const getSampleByCounty = async (countyId) => {
    const response = await axios.get(
      `http://localhost:4000/getSampleIdByCounty/${countyId}`
    );
    const data = await response.data;
    const options = data.map((d) => ({
      value: d.SampleId,
      label: d.SampleId
    }));
    // options.unshift({value:'', label:''})

    setSampleOptions({
      sampleOptionsList: options,
      countyId: countyId
    });

    setSampleDetail({...emptySampleDetail})
  };

  const getdataByCountyandsample = async (countyId, sampleId) => {
    const response = await axios.get(
      `http://localhost:4000/getDetailByCountySampleId/${countyId}/${sampleId}`
    );
    let data = await response.data;
    
    setSampleDetail({
      SampleID: data.SampleId,
      ElectionDate: data.ElectionDate,
      DateTimeOfCount: data.DateTimeOfCount,
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


  const updateCandidate = async(newData, canId, putbody)=>{
    const res = await axios.put(`http://localhost:4000/updateCandidate/${canId}`,  putbody);

    console.log('put response', res)
    console.log('candidate Data', candidateData)
    let updateDate = candidateData
    let objIndex = updateDate.findIndex(( obj => obj.CandidateId == newData.CandidateId));     
    updateDate[objIndex].Machine = newData.Machine
    updateDate[objIndex].HandToEye = newData.HandToEye
    updateDate[objIndex].DifferenceInCount = newData.DifferenceInCount
    setCandidateData(updateDate)

  }





  const handleCountySelect = (e) => {
    let countyID = e.value; // not e.target.value?
    getSampleByCounty(countyID);
    //console.log("selectedCounty2", sampleOptions.countyId);
  };

  const handleSampleSelect = (e) => {
    let countyID = sampleOptions.countyId;
    let SampleID = e.value; // not e.target.value?
    getdataByCountyandsample(countyID, SampleID);
    getCandidateByCountyandsample(countyID, SampleID);
    setSelectedSampleId(SampleID);
    //console.log("selectedCounty2", countyID, SampleID);
  };

  const handleSubmit = (e)=>{
    console.log(e.value)
  }

  var title = <h1>Sample audit record</h1>;



  const columns = [
    { title: "Candidate Name", field: "CandidateName", editable: 'never',
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

  const handleDateChange = (date)=>{
    setSampleDetail({
      ...sampleDetail, 
      DateOfCount: date

    })
  }

  console.log('sampledtail', sampleDetail)
  return (
    <div className="App">

<Grid container justifyContent = 'center'>
{title}
</Grid>
      
      <Grid container justifyContent = 'center'>       
      <Paper elevation={5} >
     
         <p>
          Remember that the sample audit count is a test to show that the
          election equipment worked properly. <br />
          If the hand count is different than the machine count, that difference
          must be explained. <br />
          However, a difference in the count does NOT change election results.
          <br />
        </p>

        </Paper>
        </Grid>
        
      
      <Grid container item spacing={1} justifyContent = 'center' className = "selection">
      
        <Grid item spacing={1} className="CountyName">
          <p className="TitleText">Please Select County </p>
          <Select
            name="County"
            options={countyOptions.selectOptions}
            onChange={handleCountySelect}
          />
        </Grid>
       

        <Grid item  className="SampleID">
          <p className="TitleText">Please Select SampleID </p>
          <Select
            name="SampleID"
            defaultValue = {selectedSampleId}
            options={sampleOptions.sampleOptionsList}
            onChange={handleSampleSelect}
          />



        </Grid>

      </Grid>

      <div>
      <Grid container spacing={1}>

        <Grid item md={2}>
          <Cards />
        </Grid>
        <Grid item md={2}>
          <Cards />
        </Grid>
        <Grid item md={2}>
          <Cards />
        </Grid>
        <Grid item md={2}>
          <Cards />
        </Grid>
      </Grid>
    </div>





      <Grid container className = "selection">
        <Grid item className="CountyName">
            <DatePickers onDateChange = {handleDateChange} selectedDate = {sampleDetail.DateOfCount}/>
        </Grid>
        <CheckboxLabels/>
      </Grid>

<Container maxWidth="fixed">
      <MaterialTable
        title="Please edit counts detail"
        columns={columns}
        data={candidateData}
        // data = {[
        //   {"CandidateName":"Alamance1","Machine":190,"HandToEye":0,"DifferenceInCount":0},
        //   {"CandidateName":"Alamance2","Machine":168,"HandToEye":0,"DifferenceInCount":0},
        // ]}
        icons={tableIcons}
        options={{ search: false,
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
          updateCandidate(newData, canId, putbody).then(response => {resolve()});  

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
        </Container>



      <div className="information">

        Sample ID: {sampleDetail.SampleID} <br />
        ElectionDate: {sampleDetail.ElectionDate} <br />
        DateTimeOfCount: {sampleDetail.DateTimeOfCount}
        <br />
        TypeOfSample: {sampleDetail.TypeOfSample}
        <br />
        PrecinctSiteName: {sampleDetail.PrecinctSiteName} <br />
      </div>

      <form onSubmit={handleSubmit}>
      
      <TextField
          id="outlined-multiline-static"
          label="Difference Explanation"
          fullWidth = 'true'
          multiline
          rows={5}
          defaultValue="If there is no difference leave it blank"
          variant="outlined"
        />

      <Button size="small" type="submit">Submit</Button> 
      </form>
   


    </div>
  );
};

export default App;
