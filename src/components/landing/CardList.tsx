import React, {useEffect, useState} from "react";

interface CardDisplay {
    card: React.ComponentType<any>;
    apiUrl: string;
}


const CardList : React.FC<CardDisplay> = ({ card: CardComponent, apiUrl }) => {

    const [allCards, setAllCards] = useState<[]>([]);


    useEffect(() => {
        const getAllCards = async () => {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des sessions d'évasion");
            }
            return await response.json();
        }

        getAllCards()
            .then((data) => {
                setAllCards(data);
                console.log(data);
            })
            .catch((error : Error) => {
                console.error("Erreur lors de la récupération des sessions d'évasion");
                console.error(error);
            });

    }, [apiUrl]);

    if (!allCards) {
        return (
            <span className="absolute left-1/2 top-1/2 loading loading-spinner text-info"></span>
        );
    }

    return (
        <div className="w-full grid grid-cols-3 gap-8 my-8 mx-auto overflow-hidden">
            {
                allCards.length === 0 ? (
                    <span className="text-center text-gray-500 col-span-3">Aucune session d'évasion disponible pour le moment.</span>
                ) : (
                    allCards.map((session: any, index: number) => (
                        <CardComponent key={index} {...session} />
                    ))
                )
            }
        </div>
    );
}

export default CardList;
