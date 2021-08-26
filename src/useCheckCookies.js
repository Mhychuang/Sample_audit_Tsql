import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

const hasCookiesExpired =()=> Cookies.get('userData') === undefined;

const cookieTimeoutId = null;

function cookieTimer() {
  if (cookieTimeoutId !== null) {
    clearTimeout(cookieTimeoutId);
    cookieTimeoutId = null;
  }

  setTimeout(() => {
    if (hasCookiesExpired()) {
      if (confirm('Your login has expired. Would you like to stay logged in?')) {
        // extend cookie
      }
    }
  }, 2000)
}


const useCheckCookies =()=>{
    cookieTimer();
}

export default useCheckCookies;