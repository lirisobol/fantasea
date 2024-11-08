import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../models/gen-info/Element";

export interface ManagerStats {
    bank: number;
    event: number;
    event_transfers: number;
    event_transfers_cost: number;
    overall_rank: number;
    percentile_rank: number;
    points: number;
    points_on_bench: number;
    rank: number;
    rank_sort: number;
    total_points:number;
    value: number;
}
export interface DraftElement {
  positionType: number; // 0 = GK, 1 = DEF, 2 = MID, 3 = ATT, -1 = Unassigned
  draftPosition: number; // 0 - 14
  isPicked: boolean;
  isCaptain: boolean;
  isViceCaptain?: boolean;
  isStarter: boolean; // true for starters, false for bench
  stats?: Element;
}

interface DraftState {
    isLive: boolean; // indicates if draft is imported or not.
  budget: number;
  squad: DraftElement[]; // Array of 15 positions (11 starters + 4 bench)
  managerStats: ManagerStats;
}
interface SetSquadPayload {
    squad: DraftElement[];
    budget: number;
    managerStats: ManagerStats;
}

const squad: DraftElement[] = [];

// Position counter for squad positions
let draftPositionCounter = 0;

// Starting Goalkeeper
squad.push({
  positionType: 1, // GK
  draftPosition: draftPositionCounter++,
  isPicked: false,
  isCaptain: false,
  isStarter: true,
  stats: null,
});

// Bench Goalkeeper
squad.push({
  positionType: 1, // GK
  draftPosition: draftPositionCounter++,
  isPicked: false,
  isCaptain: false,
  isStarter: false,
  stats: null,
});

// Defenders (4 starters)
for (let i = 0; i < 4; i++) {
  squad.push({
    positionType: 2, // DEF
    draftPosition: draftPositionCounter++,
    isPicked: false,
    isCaptain: false,
    isStarter: true,
    stats: null,
  });
}

// Midfielders (4 starters)
for (let i = 0; i < 4; i++) {
  squad.push({
    positionType: 3, // MID
    draftPosition: draftPositionCounter++,
    isPicked: false,
    isCaptain: false,
    isStarter: true,
    stats: null,
  });
}

// Attackers (2 starters)
for (let i = 0; i < 2; i++) {
  squad.push({
    positionType: 4, // ATT
    draftPosition: draftPositionCounter++,
    isPicked: false,
    isCaptain: false,
    isStarter: true,
    stats: null,
  });
}

// Bench Players (excluding bench GK already added)
// Positions 12 to 14 (indexes 11 to 13)
for (let i = 0; i < 3; i++) {
  squad.push({
    positionType: -1, // -1 indicates position not yet assigned
    draftPosition: draftPositionCounter++,
    isPicked: false,
    isCaptain: false,
    isStarter: false,
    stats: null,
  });
}

const initialState: DraftState = {
    isLive: false,
    budget: 100,
    squad: squad,
    managerStats: {
      bank: 0,
      event: 0,
      event_transfers: 0,
      event_transfers_cost: 0,
      overall_rank: 0,
      percentile_rank: 0,
      points: 0,
      points_on_bench: 0,
      rank: 0,
      rank_sort: 0,
      total_points: 0,
      value: 0,
    },
  };

const draftSlice = createSlice({
  name: "draft",
  initialState: initialState,
  reducers: {
    pickPlayer(
      state,
      action: PayloadAction<{ draftPosition: number; player: Element }>
    ) {
      const { draftPosition, player } = action.payload;
      const slot = state.squad.find((s) => s.draftPosition === draftPosition);

      if (slot && !slot.isPicked) {
        const playerCost = player.now_cost / 10;
        if (state.budget >= playerCost) {
          slot.isPicked = true;
          slot.stats = player;
          state.budget -= playerCost;
        } else {
          // Handle insufficient budget
          console.error("Insufficient budget to pick this player.");
        }
      } else {
        // Handle slot not found or already picked
        console.error("Slot not found or already occupied.");
      }
    },
    removePick(state, action: PayloadAction<{ player: Element }>) {
      const { player } = action.payload;
      // Find the slot containing the player
      const slot = state.squad.find(
        (s) => s.isPicked && s.stats?.id === player.id
      );
      if (slot) {
        // Add the player's cost back to the budget
        const playerCost = player.now_cost / 10;
        state.budget += playerCost;

        // Reset the slot
        slot.isPicked = false;
        slot.stats = undefined;
        slot.isCaptain = false;
      } else {
        // Handle player not found in squad
        console.error("Player not found in squad.");
      }
    },
    setSquad(state, action: PayloadAction<SetSquadPayload>) {
        state.isLive = true;
        state.squad = action.payload.squad;
        state.budget = action.payload.budget;
        state.managerStats = action.payload.managerStats;
    },
  },
});
export const { pickPlayer, removePick, setSquad } = draftSlice.actions;
export default draftSlice.reducer;
