import userPlaceholder from '@asset/user-placeholder.png';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

export default function AccountOverview() {
  const { userState: user } = useContext(UserContext);

  return (
    <div className="h-full w-full">
      <div className="flex w-full justify-center border-b  bg-slate-400 text-center">
        Account Overview
      </div>
      <div className="mt-12 ml-10 flex justify-evenly">
        <div className="text-center">
          <div>
            <img src={userPlaceholder} alt="" className="h-28" />
          </div>
          <div className="mt-2">{user.username}</div>
        </div>
        <div className="">
          <div>
            <span className=" mr-4 font-light">Number of posts:</span> 1
          </div>
          <div>
            <span className=" mr-4 font-light">Join date:</span> 2/2/2023
          </div>
          <div>
            <span className=" mr-4 font-light">Other data: </span> data
          </div>
        </div>
      </div>
    </div>
  );
}
