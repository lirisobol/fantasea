import fieldImage from "../../assets/field.jpg";
import { useAppSelector } from "../../store/store";
import { PlayerCard } from "./PlayerCard";

export const Board = (): JSX.Element => {
  const draftSquad = useAppSelector((state) => state.draft.squad);
  console.log(draftSquad);
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
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fieldImage})` }}
    >
      {/* squad */}
      <div className="flex flex-col w-full h-full items-center justify-evenly pt-10">
        {/* GK */}
        <div className="flex flex-row h-1/5 w-full justify-evenly">
            {startingGK.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* DEF */}
        <div className="flex flex-row h-1/5 w-full justify-evenly">
        {startingDEF.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* MID */}
        <div className="flex flex-row h-1/5 w-full justify-evenly">
        {startingMID.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* ATT */}
        <div className="flex flex-row h-1/5 w-full justify-evenly">
        {startingATT.map((player) => (
                <PlayerCard key={player.draftPosition} player={player} />
            ))}
        </div>
        {/* BENCH */}
        <div className="flex flex-row bg-slate-500 items-center justify-evenly w-full h-1/5">
            {benchPlayers.map((player) => (
                <PlayerCard key={player.draftPosition} player={player}/>
            ))}
        </div>
      </div>
    </div>
  );
};
