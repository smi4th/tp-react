export interface TimeSlot {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    customerEmail: string | null;
    participants: number | null;
}

export interface Session {
    id: number;
    name: string;
    description: string;
    tags: string[];
    duration: number;
    price: number;
    minParticipants: number;
    maxParticipants: number;
    difficulty: number;
    pictures: string[];
    timeSlots: TimeSlot[];
}
