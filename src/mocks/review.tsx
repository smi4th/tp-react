import { faker } from "@faker-js/faker";
import { delay, http, HttpResponse } from "msw";
import type {Review} from "../interfaces/escape.ts";

const reviews : Review[] = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    nameSession: faker.commerce.productName(),
    comment: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    userPicture: faker.image.avatar(),
}));

export function mockReviews() {
    return http.get("*/api/v1/reviews", async () => {
        await delay(300); // simulate network delay
        console.log("Mocked reviews data:", reviews);
        return HttpResponse.json(reviews);
    });
}