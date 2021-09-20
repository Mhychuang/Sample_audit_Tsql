import { env } from "../variables";
import axios from "axios";
//npm run build will be production. 


 export const addCandidate = async (postBody) => {
    //const res = await axios.post(`${process.env.NODE_ENV}addCandidate`, putbody);
    console.log("in add candidate", `${env.apiUrl}addCandidate`)

    const res = await axios.post(`${env.apiUrl}addCandidate`, postBody);
    console.log(res)
    return res
  }



