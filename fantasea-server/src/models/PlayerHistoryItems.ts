export interface PlayerHistoryItem {
    element: number;
    fixture: number;
    opponent_team: number;
    total_points: number;
    was_home: boolean;
    kickoff_time: string; // ISO date string
    team_h_score: number | null;
    team_a_score: number | null;
    round: number;
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string; // Values are strings representing numbers
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
    value: number; // Value in tenths of millions (e.g., 60 represents £6.0m)
    transfers_balance: number;
    selected: number;
    transfers_in: number;
    transfers_out: number;
}
  