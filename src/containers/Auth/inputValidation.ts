import { InputErrorAuth } from '../../interfaces/StateInterfaces';

export default function checkInputsAuth(
  setError: React.Dispatch<React.SetStateAction<InputErrorAuth>>,
  username: string | undefined,
  password: string | undefined,
  email?: string | undefined,
  passwordConfirm?: string | undefined
) {
  const errorObj = {} as InputErrorAuth;
  // handle username
  let inputsValid = true;

  if (!username || username.length <= 3) {
    errorObj.usernameError = 'Username too short';
    inputsValid = false;
  } else if (username.length > 15) {
    errorObj.usernameError = 'Username too long';
    inputsValid = false;
  } else {
    errorObj.usernameError = false;
  }

  if (!password || password.length <= 6) {
    errorObj.passwordError = 'Password too short';
    inputsValid = false;
  } else if (password.length > 30) {
    errorObj.passwordError = 'Password too long';
    inputsValid = false;
  } else {
    errorObj.passwordError = false;
  }
  if (!email || email.length <= 3) {
    errorObj.emailError = 'Email too short';
    inputsValid = false;
  } else if (email.length > 30) {
    errorObj.emailError = 'Email too long';
    inputsValid = false;
  } else {
    errorObj.emailError = false;
  }
  if (!passwordConfirm || passwordConfirm !== password) {
    errorObj.passwordConfirmError = 'Password does not match';
    inputsValid = false;
  } else {
    errorObj.passwordConfirmError = false;
  }
  setError(errorObj);

  return inputsValid;
}
