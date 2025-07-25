export interface escapeSession {
    id: number;
    name: string;
    description: string;
    difficulty: number;
    duration: number;
    minParticipants: number;
    maxParticipants: number;
    price: number;
    pictures: string[];
    tags: string[];
    isVr?: boolean;
    isCoop?: boolean;
    color?: string;
}


export interface Room {
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
    timeSlots?: TimeSlot[];
}

export type Reservation = {
    id: number;
    date: string;
    customerEmail: string;
    participants: number;
};

export type TimeSlot = {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    reservations: Reservation[];
};


export interface Review {

    id: string;
    username: string;
    rating: number;
    nameSession: string;
    comment: string;
    createdAt: Date;
    userPicture : string;
}