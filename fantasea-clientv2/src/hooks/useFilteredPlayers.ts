import { useMemo } from "react";
import { useAppSelector } from "../store/store";
import { Element } from "../models/gen-info/Element"; // Make sure to import the Element type if using TypeScript

const useFilteredPlayers = (
    teamCode: number,
    selectedPositionType: number,
    searchQuery: string,
    minPrice: number,
    maxPrice: number
    ) => {
    const players = useAppSelector<Element[]>((state) => state.genInfo.data?.elements);
    
    return useMemo(() => {
        if (!players) return [];
        console.log(minPrice);
        console.log(maxPrice);
        
        

        return players.filter(player => {
            const matchesTeam = teamCode === 0 || player.team_code === teamCode;
            const matchesPosition = selectedPositionType === 0 || player.element_type === selectedPositionType;
            const matchesSearch = !searchQuery || 
                player.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.second_name.toLowerCase().includes(searchQuery.toLowerCase());

            
            
            const actualPrice = player.now_cost / 10 
            const matchesPrice = actualPrice >= minPrice && actualPrice <= maxPrice; 

            // Include matchesPrice in the final return to ensure it affects the filter
            return matchesTeam && matchesPosition && matchesSearch && matchesPrice;
        });
    }, [players, teamCode, selectedPositionType, searchQuery,minPrice, maxPrice]);
};

export default useFilteredPlayers;
