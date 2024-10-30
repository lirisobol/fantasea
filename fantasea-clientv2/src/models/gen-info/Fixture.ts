interface StatValue {
    value: number;
    element: number;
  }
  
  interface FixtureStat {
    identifier: string;
    a: StatValue[];
    h: StatValue[];
  }
  
  export interface Fixture {
    code: number;
    event: number;
    finished: boolean;
    finished_provisional: boolean;
    id: number;
    kickoff_time: string;
    minutes: number;
    provisional_start_time: boolean;
    started: boolean;
    team_a: number;
    team_a_score: number | null;
    team_h: number;
    team_h_score: number | null;
    stats: FixtureStat[];
    team_h_difficulty: number;
    team_a_difficulty: number;
    pulse_id: number;
  }
  