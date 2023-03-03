/* eslint-disable react/no-array-index-key */
import list from '../assets/bugsNFeatures.json';

export default function About({ x }: { x: string }) {
  return (
    <div className=" m-auto mt-5 flex w-3/4 flex-col text-center dark:text-slate-100 sm:mt-8">
      <div className="text-2xl sm:text-4xl">About the website</div>
      <p className="mt-2 mb-5 text-sm">
        Important: This website is only used for demonstration purposes for my
        portfolio. <br />
        If you are the owner of the below websites and do not want the websites
        to be scraped please contact me!
      </p>
      <div className=" inline-flex  w-full justify-around">
        <div className="w-1/4 ">
          <span className="text-lg">Known bugs to be fixed:</span>
          <div className="m-auto mt-5 w-full border border-dashed border-white  opacity-50" />
          <ul className=" list-decimal text-left">
            {list.bugs.length ? (
              list.bugs.map((text, i) => {
                return <li key={i}>{text}</li>;
              })
            ) : (
              <li> There are no known bugs, awesome! </li>
            )}
          </ul>
        </div>
        <div>
          <span className="text-lg">Features to be implemented:</span>
          <div className="m-auto mt-5 w-full border border-dashed border-white  opacity-50" />
          <ul className=" list-decimal text-left">
            {list.features.length ? (
              list.features.map((text, i) => {
                return <li key={i}>{text}</li>;
              })
            ) : (
              <li> There are no more features to add. </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex-col sm:grid sm:grid-cols-3">
        <div>
          <div className="text-xl  sm:text-2xl">Websites used:</div>

          <div className="m-auto mt-5 w-1/2 border border-dashed border-white  opacity-50" />
          <ol className="mt-3 ">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.kupujemprodajem.com"
                className="text-blue-400 hover:border-b-2 hover:border-blue-400"
              >
                KupujemProdajem.com
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:border-b-2 hover:border-blue-400"
                href="https://www.polovniautomobili.com"
              >
                PolovniAutomobili.com
              </a>
            </li>
            <li className="mt-3 text-sm text-amber-500">
              I Plan to add one more
            </li>
          </ol>
        </div>
        <div>
          <div className="mt-6 text-xl sm:mt-0 sm:text-2xl">
            Website built with:
          </div>
          <div className="m-auto mt-5 w-1/2 border border-dashed border-white  opacity-50" />
          <p className="mt-3">Front-End: </p>
          <p>Typescript, Tailwind, React, Vite</p>
          <p className="mt-3">Back End:</p>
          <p>Express, Mongo, Node, Puppeteer</p>
        </div>

        <div>
          <div className=" mt-6 text-xl sm:mt-0 sm:text-2xl"> Contact </div>
          <div className="m-auto mt-5 w-1/2 border border-dashed border-white  opacity-50" />
          <ol className="mt-3">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/branislav.milosevic.752487"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/branislav-milosevic-006948186/"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/JustBaneIsFine/"
              >
                Github
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://mail.google.com/mail/u/0/?fs=1&to=bane.baki.1997@gmail.com&tf=cm"
              >
                Gmail
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
