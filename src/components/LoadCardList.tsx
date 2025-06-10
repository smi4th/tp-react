import CardList from "./CardList.tsx";
import CardEscapeSession from "./sessions/CardEscapeSession.tsx";
import CardReview from "./reviews/CardReview.tsx";

const LoadCardList = () => {

    return (
        <>
            <CardList card={CardEscapeSession} apiUrl={"/api/v1/escapes"} />
            <CardList card={CardReview} apiUrl={"/api/v1/reviews"} />
        </>
    )
}
export default LoadCardList