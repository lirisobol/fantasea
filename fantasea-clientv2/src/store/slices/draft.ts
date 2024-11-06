import { createSlice } from "@reduxjs/toolkit";
import { Element } from "../../models/gen-info/Element";

export interface DraftElement {
  positionType: number; // 0 = GK, 1 = DEF, 2 = MID, 3 = ATT, -1 = Unassigned
  draftPosition: number; // 0 - 14
  isPicked: boolean;
  isCaptain: boolean;
  isStarter: boolean; // true for starters, false for bench
  stats?: Element;
}

interface DraftState {
  budget: number;
  squad: DraftElement[]; // Array of 15 positions (11 starters + 4 bench)
}

const squad: DraftElement[] = [];

// Position counter for squad positions
let draftPositionCounter = 0;

// Starting Goalkeeper
squad.push({
  positionType: 0, // GK
  draftPosition: draftPositionCounter++,
  isPicked: false,
  isCaptain: false,
  isStarter: true,
  stats: null,
});

// Bench Goalkeeper
squad.push({
  positionType: 0, // GK
  draftPosition: draftPositionCounter++,
  isPicked: false,
  isCaptain: false,
  isStarter: false,
  stats: null,
});

// Defenders (4 starters)
for (let i = 0; i < 4; i++) {
  squad.push({
    positionType: 1, // DEF
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
    positionType: 2, // MID
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
    positionType: 3, // ATT
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
  budget: 100,
  squad: squad,
};

const draftSlice = createSlice({
    name: "draft",
    initialState:initialState,
    reducers: {

    }
});

export default draftSlice.reducer;
