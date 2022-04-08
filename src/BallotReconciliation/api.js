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
      const response = await axios.get(`${env.apiUrl}ballotReconcile/getVotingMethod`, {params});

      
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

      const response = await axios.get(`${env.apiUrl}ballotReconcile/getballotReconcileDetail`, {params});

      return response.data
      
    } catch (error) {
      console.error(error)
      
    }


  }