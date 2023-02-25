import { useRef } from 'react';
import ButtonClassic from '../../components/Buttons/ButtonClassic';
import { logoutFetch } from '../../ts/auth/authComm';

export default function LogoutForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className=" m-auto mt-5 flex w-4/5  justify-center text-xs sm:mt-8 sm:w-2/3 sm:text-sm">
      <div className="h-72 w-full rounded-xl bg-white sm:h-80 sm:w-1/2">
        <div className="m-5 text-center text-xl text-black sm:m-10  sm:text-3xl">
          Log out
        </div>

        <div className="m-auto mt-3 flex w-2/4 flex-col justify-center sm:mt-2">
          <ButtonClassic
            name="Log out"
            onclick={() => {
              logoutFetch();
            }}
          />
        </div>
      </div>
    </div>
  );
}
