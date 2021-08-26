import axios from "axios";

export const authenticateUser = async (email, password)=>{
    console.log(email, password)

    const response = await axios.get(
        `http://localhost:4000/auth/${email}/${password}`
      );

      if (response.data === "User not found"){
        return "Email not in the system"
      }else{
        let userData = await response.data;

        return userData;

      }


}



