
export interface ManagerHistory {
    current: EventHistory[];
    chips: ChipPlay[];
}
  
export interface EventHistory {
    event: number;
    points: number;
    total_points: number;
    rank: number;
    rank_sort: number;
    overall_rank: number;
    percentile_rank: number;
    bank: number;
    value: number;
    event_transfers: number;
    event_transfers_cost: number;
    points_on_bench: number;
}
  
export interface ChipPlay {
    name: string;
    time: string; 
    event: number;
}
  