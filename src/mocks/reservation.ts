import { faker } from "@faker-js/faker";
import { delay, http, HttpResponse } from "msw";

const reservation = {
    name: faker.string,
    email: faker.internet.email(),
    date: faker.date.future().toISOString().split('T')[0], // YYYY-MM-DD format
    time: faker.date.future().toTimeString().split(' ')[0], // HH:MM format
    guests: faker.number.int({ min: 1, max: 10 }).toString(),
};

export function mockReservation() {
    return http.post("*/api/v1/formReservation", async () => {
        await delay(300); // simulate network delay
        return HttpResponse.json(reservation);
    });
}