import { Element } from "../../../../models/gen-info/Element";
interface CustomPlayerNameProps {
    data: Element; 
}

export const CustomPlayerName: React.FC<CustomPlayerNameProps> = ({ data }) => {
    const jerseyImagePath = data && data.team_code ? `/assets/images/kits/${data.team_code}.png` : '/assets/images/kits/default.png';

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={jerseyImagePath} alt="jersey" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {data.web_name}
        </div>
    );
};
