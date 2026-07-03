import type { RoomName } from "../../types/domain.js";

/** Maps user-friendly aliases to canonical room names. */
const ROOM_ALIASES: Record<string, RoomName> = {
  drawing: "Drawing Room",
  "drawing room": "Drawing Room",
  drawingroom: "Drawing Room",

  work1: "Work Room 1",
  wr1: "Work Room 1",
  w1: "Work Room 1",
  workroom1: "Work Room 1",
  "work room 1": "Work Room 1",

  work2: "Work Room 2",
  wr2: "Work Room 2",
  w2: "Work Room 2",
  workroom2: "Work Room 2",
  "work room 2": "Work Room 2",
};

/** Resolves an alias (case-insensitive) to a room name, or null if unknown. */
export const resolveRoom = (input: string): RoomName | null => {
  const key = input.trim().toLowerCase();
  return ROOM_ALIASES[key] ?? null;
};

/** Human-readable list of accepted aliases, for help/error messages. */
export const ROOM_ALIAS_HINT = "drawing, work1, work2";
