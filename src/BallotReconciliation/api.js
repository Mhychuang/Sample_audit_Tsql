import { env } from "../variables";
import axios from "axios";



export const getDetailByCountyIdAPI = async (countyId) => {
    try {
      const response = await axios.get(`${env.apiUrl}ballotReconcile/getBRDetail/${countyId}`);
      let data = await response.data;


      return data
    } catch (error) {
      //console.error(error)
    }
  };



  export const getVotingDateAPI = async (countyId) => {
    try {
      const response = await axios.get(`${env.apiUrl}ballotReconcile/getVotingDate/${countyId}`);
      let data = await response.data;


      return data
    } catch (error) {
      //console.error(error)
    }
  };


  export const getVotingMethodAPI = async (countyName, votingDate) =>{
    try {

      let params =  {
        countyName:countyName,
        votingDate:votingDate
      }
      console.log('params from getVotingMethodAPI',params)
      const response = await axios.get(`${env.apiUrl}ballotReconcile/getVotingMethod`, {params});

      console.log('response from getVotingMethodAPI',response.data)
      return response.data
      
    } catch (error) {
      console.error(error)
      
    }


  }


  export const getBallotReconcileDetailAPI = async (countyName, votingDate) =>{
    try {

      let params =  {
        countyName:countyName,
        votingDate:votingDate
      }
      console.log('params from getBallotReconcileDetailAPI',params)
      const response = await axios.get(`${env.apiUrl}ballotReconcile/getballotReconcileDetail`, {params});

      console.log('response from getBallotReconcileDetailAPI',response)
      return response.data
      
    } catch (error) {
      console.error(error)
      
    }


  }