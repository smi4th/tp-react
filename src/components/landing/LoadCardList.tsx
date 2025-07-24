import CardList from "./CardList.tsx";
import CardEscapeSession from "../sessions/CardEscapeSession.tsx";
import {useAPI} from "@/hook/useAPI.ts";
//import CardReview from "./reviews/CardReview.tsx";


const LoadCardList = () => {

    const {baseUrl} = useAPI();

    return (
        <div className={"w-full flex flex-col justify-around items-center gap-16 mt-8 overflow-hidden"}>
            <h1 className={"text-3xl font-bold text-center"}>Nos sessions d'évasion</h1>
            <CardList card={CardEscapeSession} apiUrl={baseUrl+"/sessions"} />
            {/*<h1 className={"text-3xl font-bold text-center"}>Avis de nos clients</h1>
            <CardList card={CardReview} apiUrl={apiUrl+"/api/v1/reviews"} />*/}
        </div>
    )
}
export default LoadCardList