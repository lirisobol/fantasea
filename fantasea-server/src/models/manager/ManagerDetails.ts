import { ManagerHistory } from "../../../../fantasea-clientv2/src/models/manager/ManagerHistory";

export interface ManagerDetails {
    id: number;
    joined_time: string;
    started_event: number;
    favourite_team: number;
    player_first_name: string;
    player_last_name: string;
    player_region_id: number;
    player_region_name: string;
    player_region_iso_code_short: string;
    player_region_iso_code_long: string;
    years_active: number;
    summary_overall_points: number;
    summary_overall_rank: number;
    summary_event_points: number;
    summary_event_rank: number;
    current_event: number;
    leagues: Leagues;
    name: string;
    name_change_blocked: boolean;
    entered_events: number[];
    kit: any; // or null
    last_deadline_bank: number;
    last_deadline_value: number;
    last_deadline_total_transfers: number;
    manager_history: ManagerHistory;
}
  
  export interface Leagues {
    classic: ClassicLeague[];
    h2h: any[]; 
    cup: Cup;
    cup_matches: any[]; 
}
  
  export interface ClassicLeague {
    id: number;
    name: string;
    short_name: string | null;
    created: string;
    closed: boolean;
    rank: number | null;
    max_entries: number | null;
    league_type: string;
    scoring: string;
    admin_entry: number | null;
    start_event: number;
    entry_can_leave: boolean;
    entry_can_admin: boolean;
    entry_can_invite: boolean;
    has_cup: boolean;
    cup_league: number | null;
    cup_qualified: boolean | null;
    rank_count: number | null;
    entry_percentile_rank: number | null;
    active_phases: ActivePhase[];
    entry_rank: number;
    entry_last_rank: number;
}
  
  export interface ActivePhase {
    phase: number;
    rank: number;
    last_rank: number;
    rank_sort: number;
    total: number;
    league_id: number;
    rank_count: number | null;
    entry_percentile_rank: number | null;
}
  
  export interface Cup {
    matches: any[]; 
    status: CupStatus;
    cup_league: number | null;
}
  
  export interface CupStatus {
    qualification_event: number | null;
    qualification_numbers: number | null;
    qualification_rank: number | null;
    qualification_state: string | null;
}
  