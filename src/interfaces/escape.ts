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
    sessionId: string;
    userId: string;
    rating: number;
    name: string;
    comment: string;
    createdAt: Date;
    
}