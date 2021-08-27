import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

const hasCookiesExpired =()=> Cookies.get('userData') === undefined;

let cookieIntervalId = null;

export function clearCookiesInterval() {
  if (cookieIntervalId !== null) {
    clearInterval(cookieIntervalId);
    cookieIntervalId = null;
  }
}

export function useLoginCookiesTimer(userData) {
  const history = useHistory();
  clearCookiesInterval();

  cookieIntervalId = setInterval(() => {
    console.log('timer', Cookies.get('userData'))
    if (hasCookiesExpired()) {
      if (window.confirm('Your login has expired. Would you like to stay logged in?')) {
        // extend cookie
        setLoginCookies(userData);
      } else {
        history.replace('/logout');
      }
    }
  }, 2000)
}

export function setLoginCookies(userData) {
  const in30Minutes = 1/48
  // const in30Minutes = 3/86400;
  Cookies.set('userData', JSON.stringify(userData), {
      expires: in30Minutes
  });
}