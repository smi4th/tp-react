import { setupWorker } from "msw/browser";
import {mockReservation} from "./reservation.ts";
import {mockEscapeSessionList} from "./escape.ts";
import {mockReviews} from "./review.tsx";
const handlers = [mockEscapeSessionList(),mockReviews(), mockReservation()];
export const worker = setupWorker(...handlers);
