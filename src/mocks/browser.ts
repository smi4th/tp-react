import { setupWorker } from "msw/browser";
import {mockMissions} from "./missions.ts";
import {mockReservation} from "./reservation.ts";
const handlers = [mockMissions(), mockReservation()];
export const worker = setupWorker(...handlers);
