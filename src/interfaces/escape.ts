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

export interface Review {

    id: string;
    username: string;
    rating: number;
    nameSession: string;
    comment: string;
    createdAt: Date;
    userPicture : string;
}