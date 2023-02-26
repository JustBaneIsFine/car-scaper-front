import SearchBar from '../components/SearchBar';
import background from '../assets/images/background.jpg';
import { CarInterface } from '../interfaces/carInterface';

const websiteUnderConstruction =
  'The most important features are working, working on other features, bugs, style etc.';
const notice =
  'About page will soon be changed to contain more information about the project';
export default function Header({
  setContent,
}: {
  setContent: React.Dispatch<React.SetStateAction<false | string>>;
}) {
  return (
    <div className="w-full bg-gradient-to-b from-slate-100 to-slate-400 text-center text-black ">
      <div className="h-full w-full bg-white">
        <div className="pt-3 pb-5 text-xl sm:pt-7">
          <p className="animate-bounce">Welcome to the car scraper!</p>
          <div className="text-sm">
            <p>{websiteUnderConstruction}</p>
            <p className="p-2 font-semibold">{notice}</p>
          </div>
        </div>
        <div className="flex place-content-start ">
          <SearchBar setContentData={setContent} />
        </div>
        <div className="m-auto mt-10 flex w-3/4 flex-col items-center gap-5 pb-5">
          <p id="currentStatus" className="flex">
            {/* Current state is, not logged in/ loading/ loaded etc */}
          </p>
          <p id="note" className="flex">
            {/* note */}
          </p>
        </div>
      </div>
    </div>
  );
}
