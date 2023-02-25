import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonClassic from '../../components/Buttons/ButtonClassic';
import ButtonClassicLink from '../../components/Buttons/ButtonClassicLink';
import UserContext from '../../context/UserContext';
import { UserRequestData } from '../../interfaces/user';
import { loginCheck, loginFetch, registerFetch } from '../../ts/auth/authComm';

export default function RegisterForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
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
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="flex">
            <input
              ref={emailRef}
              required
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex">
            <input
              ref={passwordRef}
              required
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex">
            <input
              required
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="password"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <div className="m-auto mt-3 flex w-2/4 flex-col justify-center sm:mt-2">
          <ButtonClassic
            name="Create Account"
            onclick={async () => {
              const user = usernameRef.current?.value;
              const pass = passwordRef.current?.value;
              const email = emailRef.current?.value;
              const userObj: UserRequestData = {} as UserRequestData;
              if (user && pass && email) {
                userObj.username = user;
                userObj.password = pass;
                userObj.email = email;
              }

              await registerFetch(userObj);
              // eslint-disable-next-line react/destructuring-assignment
              userContext.setUserState(userObj.username, true, userObj.email);
              navigate('/');
            }}
          />
          <ButtonClassicLink name="Log in" link="/Login" />
        </div>
      </div>
    </div>
  );
}
