import { setupWorker } from "msw/browser";
import {mockEscapeSessionList} from "./escape.ts";
const handlers = [mockEscapeSessionList()];
export const worker = setupWorker(...handlers);
