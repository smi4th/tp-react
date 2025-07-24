export interface escapeSession {

    id: string;
    durationSeconds : number;
    isActive: boolean;
    difficulty: number;
    max_players : number;
    min_players : number;
    name: string;
    images: string[];
    description: string;
    tags: string[];
    isVr: boolean;
    isCoop: boolean;
    color : string;
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