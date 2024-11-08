export interface ManagerPicks {
  active_chip: string | null;
  automatic_subs: AutomaticSub[];
  entry_history: EntryHistory;
  picks: Pick[];
}

export interface AutomaticSub {
  entry: number;
  element_in: number;
  element_out: number;
  event: number;
}

export interface EntryHistory {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
}

export interface Pick {
  element: number; // Player ID
  position: number; // Position in the squad (1-15)
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
}
