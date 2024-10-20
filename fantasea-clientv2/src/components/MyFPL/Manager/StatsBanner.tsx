
interface StatsBannerProps {
    gameweek:number;
    gameweek_points:number;
}
export default function StatsBanner({gameweek, gameweek_points}:StatsBannerProps):JSX.Element {
  return (
        <div className="flex flex-row justify-evenly items-center p-2 bg-gray-900 shadow-lg text-white sticky top-0">
            <h1 className='bg-white text-gray-900 text-xl py-1 px-10 rounded-lg'>
                GW {gameweek}
            </h1>
            <p className="text-xl leading-6 text-white mt-3 pb-3">
                {gameweek_points} Pts
            </p>
        </div>
    )
}
