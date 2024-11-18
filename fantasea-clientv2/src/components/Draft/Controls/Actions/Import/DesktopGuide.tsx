import desktopGuideImage from "../../../../../assets/deskguide.png";
import dekstopGuideImage2 from "../../../../../assets/deksguide2.png";
export const DesktopGuide = (): JSX.Element => {
  return (
    <div>
      <ol>
        <li className="m-2">
          <p className="font-semibold mb-3 text-xs">1. Login To Your FPL Account</p>
        </li>
        <li className="m-2">
          <p className="font-semibold mb-3 text-xs">2. Navigate To 'Points' Tab</p>
          <img
            src={dekstopGuideImage2}
            alt="Guide to find your ID in the URL"
            className="w-full"
          />
        </li>
        <li className="m-2">
          <p className="font-semibold mb-3 text-xs">3. Locate Your ID In The URL</p>
          <p className="bg-slate-200 rounded-full py-2 text-sm hidden lg:inline-block">
            <span>https://fantasy.premierleague.com/entry/<span className="font-semibold">$ Manager ID $</span>/event/10</span>
          </p>
          <img
            src={desktopGuideImage}
            alt="Guide to find your ID in the URL"
            className="w-full"
          />
        </li>
      </ol>
    </div>
  );
};
