import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

const hasCookiesExpired =()=> Cookies.get('userData') === undefined;

let cookieIntervalId = null;

function clearCookiesInterval() {
  if (cookieIntervalId !== null) {
    clearInterval(cookieIntervalId);
    cookieIntervalId = null;
  }
}

export function useLoginCookiesTimer() {
  console.log('callthisfunction')
  const history = useHistory();
  clearCookiesInterval();

  cookieIntervalId = setInterval(() => {
    console.log('timer', hasCookiesExpired())
    if (hasCookiesExpired()) {
      if (window.confirm('Your login has expired. Would you like to stay logged in?')) {
        // extend cookie
        const userData = JSON.parse(Cookies.set('userData'));
        setLoginCookies(userData);
      } else {
        clearCookiesInterval();
        history.replace('/login');
      }
    }
  }, 2000)
}

export function setLoginCookies(userData) {
  //const in30Minutes = 1/48
  const in30Minutes = 1/24;
  Cookies.set('userData', JSON.stringify(userData), {
      expires: in30Minutes
  });
}