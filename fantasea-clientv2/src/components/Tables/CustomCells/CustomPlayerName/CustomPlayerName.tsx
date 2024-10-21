import { Element } from "../../../../models/gen-info/Element";
interface CustomPlayerNameProps {
    player: Element; 
}

export const CustomPlayerName: React.FC<CustomPlayerNameProps> = ({ player }) => {
    const jerseyImagePath = player && player.team_code ? `/assets/images/kits/${player.team_code}.png` : '/assets/images/kits/default.png';

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={jerseyImagePath} alt="jersey" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {player.web_name}
        </div>
    );
};
