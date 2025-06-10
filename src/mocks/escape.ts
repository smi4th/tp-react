import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const escape = Array.from({ length: 4 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    durationSeconds: faker.number.int({ min: 1800, max: 7200 }),
    difficulty: faker.number.int({ min: 1, max: 5 }),
    max_players: faker.number.int({ min: 5, max: 10 }),
    min_players: faker.number.int({ min: 2, max: 4 }),
    images: Array.from({ length: 3 }).map(() => faker.image.url()),
    tags: Array.from({ length: 2 }).map(() => faker.word.noun()),
    isVr: faker.datatype.boolean(),
    isCoop: faker.datatype.boolean(),
    isActive: faker.datatype.boolean(),
    color: faker.color.rgb()
}));

export function mockEscapeSessionList() {
    return http.get("*/api/v1/escapes", async () => {
        await delay(200); // simulate network delay
        return HttpResponse.json(escape);
    });
}
