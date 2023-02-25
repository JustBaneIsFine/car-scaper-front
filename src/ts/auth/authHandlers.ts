import { UserRequestData } from '../../interfaces/user';
import { loginCheck, loginFetch, logoutFetch, registerFetch } from './authComm';

export async function handleLoginAuth(data: UserRequestData) {
  const loggedIn = await loginFetch(data);
}

export async function handleRegisterAuth(data: UserRequestData) {
  const registered = await registerFetch(data);
}

export async function handleLogoutAuth() {
  const loggedOut = await logoutFetch();
}

export async function handleLoginCheck(data: UserRequestData) {
  const loggedin = await loginCheck(data);
}
