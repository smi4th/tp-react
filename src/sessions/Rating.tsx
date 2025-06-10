import React from "react";
interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {

    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className={`mask mask-star ${index < rating ? "mask-star-filled" : ""}`}
                    aria-label={`${index + 1} star`}
                    aria-current={index + 1 === rating ? "true" : undefined}
                ></div>
            ))}
        </div>
    );
};

export default Rating;