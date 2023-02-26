import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonClassic from '../../components/Buttons/ButtonClassic';
import ButtonClassicLink from '../../components/Buttons/ButtonClassicLink';
import UserContext from '../../context/UserContext';
import { InputErrorAuth } from '../../interfaces/StateInterfaces';
import { UserRequestData } from '../../interfaces/user';
import { registerFetch } from '../../ts/auth/authComm';
import checkInputsAuth from './inputValidation';

export default function RegisterForm() {
  const [inputError, setInputError] = useState<InputErrorAuth>(
    {} as InputErrorAuth
  );
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const errorObj = {} as InputErrorAuth;
    errorObj.usernameError = false;
    errorObj.passwordError = false;
    errorObj.emailError = false;
    errorObj.passwordConfirmError = false;
    setInputError(errorObj);
  }, []);

  return (
    <div className=" m-auto mt-5 flex w-4/5  justify-center text-xs sm:mt-8 sm:w-2/3 sm:text-sm">
      <div className="h-80 w-full rounded-xl bg-white sm:h-96 sm:w-1/2 ">
        <div className="m-3 text-center text-xl text-black sm:m-3 sm:text-3xl">
          Register
        </div>
        <div className="m-auto -mt-5 flex  h-2/4  w-11/12 flex-col justify-center space-y-1 sm:-mt-5  sm:space-y-2">
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
              ref={emailRef}
              required
              className={`m-auto w-4/5 rounded-sm border border-black p-1 ${
                inputError.emailError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
              type="email"
              placeholder={`${
                inputError.emailError ? inputError.emailError : 'Email'
              }`}
            />
          </div>
          <div className="flex">
            <input
              ref={passwordRef}
              required
              className={`m-auto w-4/5 rounded-sm border border-black p-1 ${
                inputError.passwordError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
              type="password"
              placeholder={`${
                inputError.passwordError ? inputError.passwordError : 'Password'
              }`}
            />
          </div>
          <div className="flex">
            <input
              required
              ref={passwordConfirmRef}
              className={`m-auto w-4/5 rounded-sm border border-black p-1 ${
                inputError.passwordConfirmError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
              type="password"
              placeholder={`${
                inputError.passwordConfirmError
                  ? inputError.passwordConfirmError
                  : 'Confirm Password'
              }`}
            />
          </div>
        </div>

        <div className="m-auto mt-3 flex w-2/4 flex-col justify-center sm:mt-2">
          <ButtonClassic
            name="Create Account"
            onclick={async () => {
              const user = usernameRef.current?.value;
              const pass = passwordRef.current?.value;
              const passConfirm = passwordConfirmRef.current?.value;
              const email = emailRef.current?.value;
              const userObj: UserRequestData = {} as UserRequestData;
              const inputValid = checkInputsAuth(
                setInputError,
                user,
                pass,
                email,
                passConfirm
              );
              if (!inputValid) {
                return;
              }

              if (user && pass && email) {
                userObj.username = user;
                userObj.password = pass;
                userObj.email = email;
              }

              const result = await registerFetch(userObj);
              if (result) {
                // eslint-disable-next-line react/destructuring-assignment
                userContext.setUserState(userObj.username, true, userObj.email);
                navigate('/');
              }
            }}
          />
          <ButtonClassicLink name="Log in" link="/Login" />
        </div>
      </div>
    </div>
  );
}
