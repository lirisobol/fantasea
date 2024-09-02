import { Fixture } from "./Fixture";

export interface Event {
    id: number; // Event ID
    name: string; // Event name, e.g., "Gameweek 3"
    deadline_time: string; // Deadline time as an ISO string
    release_time: string | null; // Release time, possibly null
    average_entry_score: number; // Average score of entries
    finished: boolean; // Whether the event is finished
    data_checked: boolean; // Whether the data has been checked
    highest_scoring_entry: number | null; // ID of the highest scoring entry, possibly null
    deadline_time_epoch: number; // Deadline time as epoch timestamp
    deadline_time_game_offset: number; // Offset from the game's start time
    highest_score: number | null; // Highest score achieved, possibly null
    is_previous: boolean; // Whether this event is the previous one
    is_current: boolean; // Whether this event is the current one
    is_next: boolean; // Whether this event is the next one
    cup_leagues_created: boolean; // Whether cup leagues have been created
    h2h_ko_matches_created: boolean; // Whether head-to-head knockout matches have been created
    ranked_count: number; // Number of ranked entries
    chip_plays?: { [key: string]: number }; // Optional, tracks chips played (key-value pairs)
    most_selected: number | null; // ID of the most selected player, possibly null
    most_transferred_in: number | null; // ID of the most transferred in player, possibly null
    top_element: number | null; // ID of the top element (e.g., top player), possibly null
    top_element_info: { [key: string]: number } | null; // Optional, additional info about top element
    transfers_made: number; // Number of transfers made
    most_captained: number | null; // ID of the most captained player, possibly null
    most_vice_captained: number | null; // ID of the most vice-captained player, possibly null
    fixtures: Fixture[] | null;
}
