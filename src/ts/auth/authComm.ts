import {
  LoginCheckReturn,
  RegisterReturnValue,
  ReturnValueBasic,
} from '../../interfaces/mongoInterfaces';
import { UserRequestData } from '../../interfaces/user';

// const mainUrl = 'https://car-scraper-api.vercel.app';
// test url
const mainUrl = 'http://localhost:3000';

const loginUrl = mainUrl.concat('/login');
const registerUrl = mainUrl.concat('/register');
const checkLogin = mainUrl.concat('/loginCheck');
const logout = mainUrl.concat('/logout');

export async function fetchData(
  method: 'POST' | 'GET',
  url: string,
  data?: UserRequestData
) {
  const result = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((e) => {
    console.log(e);
    return e;
  });

  if (!result.ok) {
    return false;
  }
  return result;
}

export async function loginFetch(data: UserRequestData) {
  const result = await fetchData('POST', loginUrl, data);
  if (!result || !result.ok) {
    console.log('login network error ');
    return false;
  }
  const resultParsed = await result.json();

  if (!resultParsed.success && resultParsed.error) {
    console.log('You are not logged in', resultParsed.error);
    return false;
  }
  return resultParsed.user;
}

export async function registerFetch(data: UserRequestData) {
  const result = await fetchData('POST', registerUrl, data);
  if (!result) {
    console.log('register network error ');
    return false;
  }
  const resultParsed = await result.json();
  if (resultParsed.success && !resultParsed.error) {
    return resultParsed.user;
  }
  return resultParsed.error;
}

export async function logoutFetch() {
  const result = await fetchData('GET', logout);
  if (!result) {
    console.log('logout network error ');
    return false;
  }
  const resultParsed: ReturnValueBasic = await result.json();

  if (resultParsed.success && !resultParsed.loggedIn) {
    return true;
  }

  return resultParsed.error;
}

export async function loginCheck() {
  const result = await fetchData('GET', checkLogin);
  if (!result) {
    console.log('Login check: Network error ');
    return false;
  }
  const resultParsed: LoginCheckReturn = await result.json();
  if (resultParsed.user && resultParsed.loggedIn) {
    console.log('you are logged in', resultParsed.user.username);
    return resultParsed.user;
  }
  console.log('You are logged out');
  return false;
}
