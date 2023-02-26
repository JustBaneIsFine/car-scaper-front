import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonClassic from '../../components/Buttons/ButtonClassic';
import ButtonClassicLink from '../../components/Buttons/ButtonClassicLink';
import { loginFetch } from '../../ts/auth/authComm';
import { UserRequestData } from '../../interfaces/user';
import UserContext from '../../context/UserContext';
import { InputErrorAuth } from '../../interfaces/StateInterfaces';
import checkInputsAuth from './inputValidation';

export default function LoginForm() {
  const [inputError, setInputError] = useState<InputErrorAuth>(
    {} as InputErrorAuth
  );
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const errorObj = {} as InputErrorAuth;
    errorObj.usernameError = false;
    errorObj.passwordError = false;
    errorObj.emailError = false;
    setInputError(errorObj);
  }, []);

  return (
    <div className="  m-auto mt-5 flex w-4/5  justify-center text-xs sm:mt-8 sm:w-2/3 sm:text-sm">
      <div className="h-72 w-full rounded-xl bg-white sm:h-80 sm:w-1/2">
        <div className="m-5 text-center text-xl text-black sm:m-10  sm:text-3xl">
          Log in
        </div>
        <div className="m-auto -mt-5 flex  h-2/4  w-11/12 flex-col justify-center space-y-1 sm:-mt-12  sm:space-y-2">
          <div className="flex">
            <input
              ref={usernameRef}
              required
              className={`m-auto w-4/5 rounded-sm border border-black p-1 ${
                inputError.usernameError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
              type="text"
              placeholder={`${
                inputError.usernameError ? inputError.usernameError : 'Username'
              }`}
            />
          </div>
          <div className="flex">
            <input
              ref={passwordRef}
              required
              className={`m-auto w-4/5 rounded-sm border border-black p-1 ${
                inputError.passwordError
                  ? 'animate-pulse border-2 border-red-600'
                  : ''
              } `}
              type="password"
              placeholder={`${
                inputError.passwordError ? inputError.passwordError : 'Password'
              }`}
            />
          </div>
        </div>
        <div className="-mt-7 mr-9 flex justify-end">
          <a href="/" className="text-sky-300 hover:text-sky-500">
            Forgot your password?
          </a>
        </div>
        <div className="m-auto mt-3 flex w-2/4 flex-col justify-center sm:mt-2">
          <ButtonClassic
            name="Log in"
            onclick={async () => {
              const user = usernameRef.current?.value;
              const pass = passwordRef.current?.value;
              const email = emailRef.current?.value;
              const userObj: UserRequestData = {} as UserRequestData;

              const inputValid = checkInputsAuth(
                setInputError,
                user,
                pass,
                null,
                null
              );
              if (!inputValid) {
                return;
              }
              if (user && pass && email) {
                userObj.username = user;
                userObj.password = pass;
                userObj.email = email;
              }

              const result = await loginFetch(userObj);
              if (result.success) {
                // eslint-disable-next-line react/destructuring-assignment
                userContext.setUserState(
                  result.user.username,
                  true,
                  result.user.email
                );
                navigate('/');
              } else if (result.error) {
                setInputError((prev) => ({
                  ...prev,
                  usernameError: result.error,
                  passwordError: result.error,
                }));
                if (usernameRef.current && passwordRef.current) {
                  usernameRef.current.value = '';
                  passwordRef.current.value = '';
                }
              }
            }}
          />
          <ButtonClassicLink name="Register" link="/Register" />
        </div>
      </div>
    </div>
  );
}
