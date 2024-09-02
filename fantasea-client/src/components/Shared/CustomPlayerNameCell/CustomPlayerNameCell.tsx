import React from 'react';
import { Team } from "../../../models/general-info/Team";

interface CustomClubNameCellProps {
    data: Team; 
}

export const CustomClubNameCell: React.FC<CustomClubNameCellProps> = ({ data }) => {
    const jerseyImagePath = data && data.code ? `/assets/images/kits/${data.code}.png` : '/assets/images/kits/default.png';

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={jerseyImagePath} alt="jersey" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {data.name}
        </div>
    );
};
