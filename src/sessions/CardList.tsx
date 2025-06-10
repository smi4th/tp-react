import React, {useEffect} from "react";
import type {escapeSession} from "../interfaces/escape.ts";
import Card from "./Card.tsx";

const CardList : React.FC = () => {

    const [allSessions, setAllSessions] = React.useState<escapeSession[]>([]);

    useEffect(() => {

        const getAllSessions = async () => {

            const response = await fetch("/api/v1/escapes");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des sessions d'évasion");
            }
            return await response.json();
        }


        getAllSessions()
            .then((data) => {
                setAllSessions(data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des sessions d'évasion :", error);
            });

    }, []);

    if (!allSessions){
        return (
            <span className="absolute left-1/2 top-1/2 loading loading-spinner text-info"></span>
        )
    }

    return (
        <div className={"w-full flex flex-wrap gap-4"}>
            {allSessions.map((session, index) => (
                <Card key={index} {...session} />
            ))}
        </div>
    )
}

export default CardList;