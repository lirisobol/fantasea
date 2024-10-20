export interface LeagueDetails {
    last_updated_data: string;
    league_name: string
    standings: Standings
}
export interface Standings {
    has_next: boolean;
    page: number;
    results: StandingResult[];
}
export interface StandingResult {
    id: number;
    event_total: number;
    player_name: string;
    rank: number;
    last_rank: number;
    rank_sort: number;
    total: number;
    entry: number;
    entry_name: string;
}