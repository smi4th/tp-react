import CardList from "./CardList.tsx";
import CardEscapeSession from "../sessions/CardEscapeSession.tsx";
//import CardReview from "./reviews/CardReview.tsx";

let apiUrl: string = import.meta.env.API_URL || "http://localhost:3000";
if (import.meta.env.ENV === "test") {
    apiUrl = "";
}

const LoadCardList = () => {

    return (
        <div className={"w-full flex flex-col justify-around items-center gap-16 mt-8 overflow-hidden"}>
            <h1 className={"text-3xl font-bold text-center"}>Nos sessions d'évasion</h1>
            <CardList card={CardEscapeSession} apiUrl={apiUrl+"/sessions"} />
            {/*<h1 className={"text-3xl font-bold text-center"}>Avis de nos clients</h1>
            <CardList card={CardReview} apiUrl={apiUrl+"/api/v1/reviews"} />*/}
        </div>
    )
}
export default LoadCardList