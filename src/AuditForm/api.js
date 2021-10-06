import { env } from "../variables";
import axios from "axios";
//npm run build will be production. 


 export const addCandidate = async (postBody) => {
    //const res = await axios.post(`${process.env.NODE_ENV}addCandidate`, putbody);
    console.log("in add candidate", `${env.apiUrl}sampleAudit/addCandidate`)

    const res = await axios.post(`${env.apiUrl}sampleAudit/addCandidate`, postBody);
    console.log(res)
    return res
  }



  export const getdataByCountyandsample = async (countyId, SampleId) => {
    console.log(countyId, SampleId)
    const response = await axios.get(
      `${env.apiUrl}sampleAudit/getDetailByCountySampleId/${countyId}/${SampleId}`
    );
    let data = await response.data;
    let newDateOfCount = String(new Date())
    let newTimeOfCount = String(new Date())

    if (data.DateOfCount == undefined || data.DateOfCount == null) {
      //console.log ('Not in DB', data.DateOfCount)
      //dateOfCount = dateOfCount.slice(0,-1)
      //console.log(newDateOfCount)

    } else {
      //console.log ('Yes', data.DateOfCount)
      newDateOfCount = String(data.DateOfCount)
      newDateOfCount = newDateOfCount.slice(0, -1)
    }


    if (data.TimeOfCount == undefined || data.TimeOfCount == null) {
      //console.log ('Not in DB', data.TimeOfCount)
      //TimeOfCount = TimeOfCount.slice(0,-1)
      //console.log(newTimeOfCount)
    } else {
      //console.log ('Yes', data.TimeOfCount)
      newTimeOfCount = String(data.TimeOfCount)
      newTimeOfCount = newTimeOfCount.slice(0, -1)
    }

    const CostOfCount = Number(data.CostOfCount)
    const TotalTime = Number(data.TotalTime)
    const VotingArray = data.VotingEquipmentUsed.split(',');
    
    let newSampleDetail ={
        CountyId: countyId,
        SampleId: data.SampleId.toString(),  //why to string
        ElectionDate: data.ElectionDate,
        TypeOfSample: data.TypeOfSample,
        PrecinctSiteName: data.PrecinctSiteName,
        ContestName: data.ContestName,
        CountyName: data.CountyName,
        DateOfCount: newDateOfCount,
        TimeOfCount: newTimeOfCount,
        VotingEquipmentUsed: VotingArray,
        HumanOrMachineError: data.HumanOrMachineError,
        DifferenceExplanation: data.DifferenceExplanation,
        PeoplePartyCounting: data.PeoplePartyCounting,
        TotalTime: TotalTime,
        CostOfCount: CostOfCount
    }

    return newSampleDetail
  };


  export const getCandidateByCountyandsample = async (countyId, SampleId) => {
    try {
      const response = await axios.get(`${env.apiUrl}sampleAudit/getCandidateByCountySampleId/${countyId}/${SampleId}`);
      let data = await response.data;


      return data
    } catch (error) {
      //console.error(error)
    }
  };

