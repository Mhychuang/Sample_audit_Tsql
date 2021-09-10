import axios from "axios";

export const authenticateUser = async (email, password)=>{
    let putbody = {
      "email": email,
      "password": password
    }


    const response = await axios.put(
        `https://sampleaudit.ncsbe.gov/auth/check/${email}`, putbody
      );

      if (response.data === "User not found"){
        return "Email not in the system"
      }else{
        let userData = await response.data;

        return userData;

      }


}



