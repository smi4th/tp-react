import { setupWorker } from "msw/browser";
import {mockReservation} from "./reservation.ts";
import {mockEscapeSessionList} from "./escape.ts";
const handlers = [mockEscapeSessionList(), mockReservation()];
export const worker = setupWorker(...handlers);
