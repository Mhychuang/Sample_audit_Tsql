import axios from "axios";
import { env } from "../variables";

export const authenticateUser = async (email, password)=>{
    let putbody = {
      "email": email,
      "password": password
    }


    const response = await axios.put(
        `${env.apiUrl}auth/check/${email}`, putbody
      );

      if (response.data === "User not found"){
        return "Email not in the system"
      }else{
        let userData = await response.data;

        return userData;

      }


}


export const getAllCounty = async ()=>{
 
  let response = await axios.get(
    `${env.apiUrl}sampleAudit/allCounty/`
  );

  return response

}


