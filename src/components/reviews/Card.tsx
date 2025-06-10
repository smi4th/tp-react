import React from "react";
import type { Review } from "../../interfaces/escape.ts";
import Rating from "../sessions/Rating.tsx";

const Card: React.FC<Review> = (props) => {
    const { username, rating, nameSession, comment, createdAt, userPicture } = props;

    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src={userPicture} alt={`${username}'s avatar`} />
                        </div>
                    </div>
                </div>
                <div className="stat-title">{username}</div>
                <div className="stat-value text-primary">
                    <Rating rating={rating} />
                </div>
                <div className="stat-desc">{nameSession}</div>
            </div>

            <div className="stat">
                <div className="stat-title">Comment</div>
                <div className="text-normal text-md">{comment}</div>
                <div className="stat-desc">
                    Posted on {new Date(createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default Card;