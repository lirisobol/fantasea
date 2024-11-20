import fieldImage from "../../assets/field.jpg";
import { useAppSelector } from "../../store/store";
import { Budget } from "./Controls/Indicators/Budget";
import { EventPoints } from "./Controls/Indicators/EventPoints";
import { OverallRank } from "./Controls/Indicators/OverallRank";
import { TotalPoints } from "./Controls/Indicators/TotalPoints";
import { PlayerCard } from "./PlayerCard";

export const Board = (): JSX.Element => {
    const isLive = useAppSelector((state) => state.draft.isLive)
  const draftSquad = useAppSelector((state) => state.draft.squad);
  const startingGK = draftSquad.filter(
    (player) => player.positionType === 1 && player.isStarter
  );

  const startingDEF = draftSquad.filter(
    (player) => player.positionType === 2 && player.isStarter
  );

  const startingMID = draftSquad.filter(
    (player) => player.positionType === 3 && player.isStarter
  );

  const startingATT = draftSquad.filter(
    (player) => player.positionType === 4 && player.isStarter
  );

  const benchPlayers = draftSquad.filter((player) => !player.isStarter);
  return (
    <div
      className="w-full bg-cover bg-center h-screen max-h-[80vh] md:max-h-[87.7vh]"
      style={{ backgroundImage: `url(${fieldImage})` }}
    >
        <div className="flex flex-row gap-2 justify-center p-1">
            <Budget />
        {isLive && (
          <>
            <OverallRank />
            <TotalPoints />
            <EventPoints />
          </>
        )}
        </div>

      {/* squad */}
      <div className="flex flex-col w-full justify-evenly pt-2 md:gap-10 gap-10">
        {/* GK */}
        <div className="flex flex-row h-2/12 w-full justify-evenly md:p-2 gap-1">
            {startingGK.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* DEF */}
        <div className="flex flex-row h-2/12 w-full justify-evenly md:p-2 gap-1">
        {startingDEF.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* MID */}
        <div className="flex flex-row h-2/12 w-full justify-evenly md:p-2 gap-1">
        {startingMID.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* ATT */}
        <div className="flex flex-row h-2/12 w-full justify-evenly md:p-2 gap-1">
        {startingATT.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* BENCH */}
        <div className="flex flex-row border-t-2 justify-evenly w-full h-1/12 md:p-2 gap-2 pt-5">
            {benchPlayers.map((player) => (
                <PlayerCard key={player.draftPosition} player={player}/>
            ))}
        </div>
      </div>

    </div>
  );
};
