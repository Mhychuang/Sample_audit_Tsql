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

export function useLoginCookiesTimer(userData, onOpenAlertDialog) {
  const history = useHistory();
  clearCookiesInterval();

  cookieIntervalId = setInterval(() => {
    console.log('timer', Cookies.get('userData.Email'))
    if (hasCookiesExpired()) {
      onOpenAlertDialog();
      
    }
  }, 2000)
}

export function setLoginCookies(userData) {
  const in30Minutes = 1/48
  const in15Minutes = 1/96

  const in10Minutes = 1/144
  //console.log('stay', userData)
  Cookies.set('userData', JSON.stringify(userData), {
      expires: in15Minutes
  });
}