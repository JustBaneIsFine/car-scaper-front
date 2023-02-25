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
  if (!result) {
    console.log('login network error ');
  }
  console.log('You are logged in', data.username);
  return true;
}

export async function registerFetch(data: UserRequestData) {
  const result = await fetchData('POST', registerUrl, data);
  if (!result) {
    console.log('register network error ');
  }
  console.log('You are registered', data.username);
  return true;
}

export async function logoutFetch() {
  const result = await fetchData('GET', logout);
  if (!result) {
    console.log('logout network error ');
  }
  console.log('You are logged out');
  return true;
}

export async function loginCheck(data: UserRequestData) {
  const result = await fetchData('GET', checkLogin);
  if (!result) {
    console.log('login check network error ');
  }
  const resultx = result.json();
  if (resultx.loggedin) {
    console.log('you are logged in', data.username);
    return true;
  }
  console.log('You are logged out');
  return true;
}
