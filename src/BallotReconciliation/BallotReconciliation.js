import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { Grid, Fade } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Cards from '../components/infoCards';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Box from '@material-ui/core/Box';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";



// import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

import { env } from "../variables";

//import api
import { getDetailByCountyIdAPI, getVotingDateAPI, getVotingMethodAPI, getBallotReconcileDetailAPI } from "./api";


//for icon
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
//import Export from '@material-ui/icons/Export';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const BallotReconciliation = (props) => {

    const emptyBRDetail = {
        CountyId: "",
        SampleId: "",
        ElectionDate: "",
        CountyName: "",
        ContestName: "",
        TypeOfSample: "",
        PrecinctSiteName: "",
        CandidateName1: "",
        CandidateName2: "",


    }



    const emptyVotingDate = {
        CountyName: "",
        votingList: []
    }



    const [bRDetail, setBRDetail] = React.useState();

    const [countyVotingData, setCountyVotingData] = React.useState({
        ...emptyVotingDate
    });

    const emptyVotingMethod = {
        VotingMethod: "N/A",
        ElectionDate: "N/A",
        VotingDateSelected: "",

    }

    const [votingMethod, setVotingMethod] = React.useState(
        { ...emptyVotingMethod }
    )


    const [rows, setRows] = React.useState();

    const title = <h1>Ballot Reconciliation Reporting</h1>;
    // functions

    const handleDateSelect = (e) => {

        let countyName = countyVotingData.CountyName
        let voetingDate = e.target.value




        console.log(countyName)
        console.log(voetingDate)

        if (countyName && voetingDate) {
            getVotingMethodAPI(countyName, voetingDate).then((results) => {
                results.VotingDateSelected = e.target.value
                console.log('votingMethod results', results)
                setVotingMethod(results)



            }).catch((error) => {
                console.log(error);
            })

            getBallotReconcileDetailAPI(countyName, voetingDate).then((results) => {
                console.log('votingMethod results', results)
                setRows(results)



            }).catch((error) => {
                console.log(error);
            })



        } else {
            console.log('invalid parameter')
        }




    }



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
            paddingLeft: '5%',
            paddingRight: '5%',
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



    const getDetailByCountyId = async (countyId) => {
        //console.log(props.userData.CountyId)
        console.log('countyId', countyId)
        let response = await getDetailByCountyIdAPI(countyId)

        console.log('Response', response)

        setBRDetail({
            ...response


        })

    }


    const getVotingDate = async (countyId) => {
        //console.log(props.userData.CountyId)

        let response = await getVotingDateAPI(countyId)
        console.log('getVotingDate Results', response)
        setCountyVotingData({
            ...countyVotingData,
            ...response
        })

        console.log('Response', response.CountyName)

    }



    const updateBallotReconcile = async (putbody) => {
        const res = await axios.put(`${env.apiUrl}ballotReconcile/updateBallotReconcile`, putbody);
        console.log(rows)
        let updateData = rows
        //let updateData = [...rows]
        console.log(updateData)
        let objIndex = updateData.findIndex((obj => obj.BallotReconcileId == putbody.BallotReconcileId));
        updateData[objIndex].OriginalCount = putbody.OriginalCount
        updateData[objIndex].Spoiled = putbody.Spoiled
        updateData[objIndex].Provisional = parseInt(putbody.Provisional)
        updateData[objIndex].Challenged = parseInt(putbody.Challenged)
        updateData[objIndex].Unused = parseInt(putbody.Challenged)
        updateData[objIndex].BallotsCast = parseInt(putbody.BallotsCast)
        updateData[objIndex].Comments = putbody.Comments

        setRows(updateData)
    }


    React.useEffect(() => {


        //getDetailByCountyId(props.userData.CountyId)

        getVotingDate(props.userData.CountyId)


    }, []);






    React.useEffect(() => {


        console.log(countyVotingData)



        console.log(countyVotingData['CountyName'])
        console.log(countyVotingData['votingList'])


    }, [countyVotingData]);


    React.useEffect(() => {


        console.log('rows data', rows)


    }, [rows]);


    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <Edit style={{ color: "Red" }} {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };





    //for material table
    const columns = [
        {
            title: "VotingSite", field: "VotingSite", editable: 'never',
            cellStyle: {
                minWidth: 250,
                maxWidth: 250
            },

            headerStyle: {
                width: 250,
                minWidth: 250
            },

        },
        {
            title: "BallotStyle", field: "BallotStyle", editable: 'never',
            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },

        },
        {
            title: "OriginalCount", field: "OriginalCount", type: "numeric",
            // editComponent: (props) => (
            //     <TextField
            //       type="text"
            //       error={props.value}
            //       //helperText={props.value}
            //       //value={props.value ? props.value : ""}
            //       //onChange={(e) => props.onChange(e.target.value)}
            //     />
            //   ),

            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },


            validate: rowData => rowData.OriginalCount < 0 ? { isValid: false, helperText: 'No negative Number' } : true,




        },
        {
            title: "Spoiled", field: "Spoiled", type: "numeric",
            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },

            validate: rowData => rowData.Spoiled < 0 ? { isValid: false, helperText: 'No negative Number' } : true,


        },
        {
            title: "Provisional", field: "Provisional", type: "numeric",
            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },

            validate: rowData => rowData.Provisional < 0 ? { isValid: false, helperText: 'No negative Number' } : true,

        },
        {
            title: "Challenged", field: "Challenged", type: "numeric",
            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },

            validate: rowData => rowData.Challenged < 0 ? { isValid: false, helperText: 'No negative Number' } : true,

        },
        {
            title: "Unused", field: "Unused", type: "numeric",
            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },

            validate: rowData => rowData.Unused < 0 ? { isValid: false, helperText: 'No negative Number' } : true,

        },
        {
            title: "BallotsCast", field: "BallotsCast", type: "numeric", editable: 'never',
            cellStyle: {
                minWidth: 5,
                maxWidth: 5
            },
            headerStyle: {
                width: 5,
                minWidth: 5
            },

        },
        {
            title: "Comments", field: 'Comments',
            //validate: rowData => rowData.Comments == '' ? { isValid: false, helperText: 'cannot be empty' } : true

        }]



    return (
        <Grid>


            <Grid container className={classes.entireForm} spacing={3} >
                <Grid container item spacing={0} justifyContent='space-between' alignItems='stretch'>


                    <Grid container item justifyContent='center' className={classes.title}>
                        {title}

                    </Grid>

                    <Grid container item justifyContent='center' >


                        <FormControl className={classes.formControl}>




                            <InputLabel id="demo-simple-select-helper-label">Voting Date</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={handleDateSelect}

                            >
                                {countyVotingData.votingList && countyVotingData.votingList.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>


                            <FormHelperText>Please select a voting date</FormHelperText>




                        </FormControl>

                    </Grid>






                    <Grid container item spacing={0} justifyContent='space-between' alignItems='stretch'>

                        <Grid item xs >
                            <Cards cardName={'County'} CardValue={countyVotingData.CountyName} />
                        </Grid>

                        <Grid item xs >
                            <Cards cardName={'Voting Method'} CardValue={votingMethod.VotingMethod} />
                        </Grid>

                        <Grid item xs >
                            <Cards cardName={'Election Date'} CardValue={votingMethod.ElectionDate} />
                        </Grid>

                    </Grid>

                </Grid>


                <Grid item xs={12}>
                    <MaterialTable

                        // style={true && { border: '2px solid black' }}

                        style={
                            { border: '1px solid black' }

                        }



                        title="Ballot Reconcile Form"
                        //icons={{ Export: () => 'Export' }}
                        //icons={tableIcons}

                        icons={{
                            Export: () =>       <Button variant="contained" color="secondary">
                            Export
                          </Button>,

                        }}

                        columns={columns}
                        data={rows}


                        options={{
                            search: false,
                            paging: false,
                            sorting: false,
                            actionsColumnIndex: -1,
                            tableLayout: 'auto',
                            rowStyle: {
                                fontSize: 14,
                            },
                            exportButton: true,
                            exportFileName: countyVotingData.CountyName + "_" + votingMethod.VotingMethod + "_" + votingMethod.VotingDateSelected
                            // toolbarButtonAlignment: 'left',   `test-${new Date().toISOString()}`







                        }}


                        editable={{

                            onRowUpdate:

                                (newData, oldData) => new Promise((resolve, reject) => {


                                    //setFormValidation({ ...formValidation, CandidatesCounts: false })
                                    //Backend call
                                    console.log(oldData)
                                    let ReconcileID = oldData.BallotReconcileId
                                    //(Original Count – Spoiled – Provisional – Unused – Challenged)

                                    let BallotsCast = parseInt(newData.OriginalCount) - parseInt(newData.Spoiled) -
                                        parseInt(newData.Provisional) - parseInt(newData.Unused) - parseInt(newData.Challenged)


                                    let putbody = {

                                        "BallotReconcileId": newData.BallotReconcileId,
                                        "OriginalCount": parseInt(newData.OriginalCount),
                                        "Spoiled": parseInt(newData.Spoiled),
                                        "Provisional": parseInt(newData.Provisional),
                                        "Challenged": parseInt(newData.Challenged),
                                        "Unused": parseInt(newData.Unused),
                                        "BallotsCast": parseInt(BallotsCast),
                                        "Comments": newData.Comments

                                    }


                                    console.log(newData)

                                    updateBallotReconcile(putbody).then(response => {
                                        console.log(response)
                                        resolve()
                                    });


                                }),


                        }}



                    />
                </Grid>

            </Grid>

            <Grid container className={classes.entireForm} spacing={0} >





            </Grid>


        </Grid>

    )



};

export default BallotReconciliation;