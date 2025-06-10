import React, {useEffect} from "react";
import type {Review} from "../interfaces/escape.ts";
import Card from "./Card.tsx";

const CardListReview : React.FC = () => {

    const [allReviews, setAllReviews] = React.useState<Review[] | null>(null);

    useEffect(() => {

        const getAllReviews = async () => {

            const response = await fetch("/api/v1/reviews");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des reviews");
            }
            return await response.json();
        }


        getAllReviews()
            .then((data) => {
                setAllReviews(data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des reviews :", error);
            });

    }, []);

    if (!allReviews) {
        return (
            <span className="absolute left-1/2 top-1/2 loading loading-spinner text-info"></span>
        )
    }

    return (
        <div className={"w-full flex flex-wrap gap-4"}>
            {allReviews.map((session, index) => (
                <Card key={index} {...session} />
            ))}
        </div>
    )
}

export default CardListReview;