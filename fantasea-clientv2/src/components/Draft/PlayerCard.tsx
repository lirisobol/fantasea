import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Element } from '../../models/gen-info/Element';
interface PlayerCardProps {
    player: Element;
    onAddPlayer: () => void;
}
export const PlayerCard = ({ player, onAddPlayer }: PlayerCardProps):JSX.Element => {
    return (
        <div className="player-card bg-slate-300 border p-2">
            {player ? (
                <>
                    <img src={`/path/to/jerseys/${player.team_code}.png`} alt="Jersey" className="h-10 w-10"/>
                    <div>{player.first_name} {player.second_name}</div>
                    <div>{player.element_type}</div>
                </>
            ) : (
                <button onClick={onAddPlayer} className="flex flex-col items-center justify-center">
                    <PlusIcon className="h-5 w-5 text-gray-500"/>
                    <span>Add Player</span>
                </button>
            )}
        </div>
    );
};

