import SearchBar from '../components/SearchBar';
import background from '../assets/images/background.jpg';
import { CarInterface } from '../interfaces/carInterface';

const websiteUnderConstruction =
  'Website coming soon(ish): Our website is still in its caterpillar stage. User authentication and post creation features offline. The human is working on it.';
const notice =
  'Search...functionality...activated. New update: Scraping capabilities increased beyond recommended limits (100+ pages processed in under 10 seconds), however we shall limit this to 10 pages to keep the servers happy and not use up too much data';
export default function Header({
  setContent,
}: {
  setContent: React.Dispatch<React.SetStateAction<(false | CarInterface[])[]>>;
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
