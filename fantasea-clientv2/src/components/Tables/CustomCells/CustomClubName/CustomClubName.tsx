import React from 'react';
import { Team } from '../../../../models/gen-info/Team';

interface CustomClubNameProps {
    data: Team; 
}

export const CustomClubName: React.FC<CustomClubNameProps> = ({ data }) => {
    const jerseyImagePath = data && data.code ? `/assets/images/kits/${data.code}.png` : '/assets/images/kits/default.png';

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={jerseyImagePath} alt="jersey" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {data.name}
        </div>
    );
};
