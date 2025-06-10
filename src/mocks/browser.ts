import { setupWorker } from "msw/browser";
import {mockMissions} from "./missions.ts";
const handlers = [mockMissions()];
export const worker = setupWorker(...handlers);
