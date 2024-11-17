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
      className="w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${fieldImage})` }}
    >
        <div className="py-2 px-2 absolute right-5">
            <Budget />
        </div>
        <div className="py-2 px-2 absolute left-2 flex flex-row gap-2">
        {isLive && (
          <>
            <OverallRank />
            <TotalPoints />
            <EventPoints />
          </>
        )}
      </div>

      {/* squad */}
      <div className="flex flex-col w-full h-full items-center justify-evenly pt-10 gap-5">
        {/* GK */}
        <div className="flex flex-row h-1/5 w-full justify-evenly p-2">
            {startingGK.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* DEF */}
        <div className="flex flex-row h-1/5 w-full justify-evenly p-2">
        {startingDEF.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* MID */}
        <div className="flex flex-row h-1/5 w-full justify-evenly p-2">
        {startingMID.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* ATT */}
        <div className="flex flex-row h-1/5 w-full justify-evenly p-2">
        {startingATT.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* BENCH */}
        <div className="flex flex-row border-t-2 items-center justify-evenly w-full h-1/5 p-2">
            {benchPlayers.map((player) => (
                <PlayerCard key={player.draftPosition} player={player}/>
            ))}
        </div>
      </div>

    </div>
  );
};
