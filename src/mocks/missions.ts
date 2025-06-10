import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import type { Mission } from "../models/Mission.ts";

const missions: Mission[] = Array.from({ length: 6 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    shortDescription: faker.lorem.sentence(),
    longDescription: faker.lorem.paragraphs(2),
    duration: faker.number.int({ min: 30, max: 120 }),
    difficultyLevel: faker.number.int({ min: 1, max: 5 }),
    minPlayerNumber: faker.number.int({ min: 2, max: 4 }),
    maxPlayerNumber: faker.number.int({ min: 5, max: 10 }),
    price: faker.number.float({ min: 15, max: 60, precision: 0.01 }),
}));

export function mockMissions() {
    return http.get("*/api/v1/missions", async () => {
        await delay(300); // simulate network delay
        return HttpResponse.json(missions);
    });
}
