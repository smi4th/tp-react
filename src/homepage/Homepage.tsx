import './Homepage.css'
import CompanyInfoHome from "./companyInfo/CompanyInfoHome.tsx";
import styles from "./home.module.css"
import LoadCardList from "../components/LoadCardList.tsx";

function Homepage() {

    return (
        <>
                <div className={styles.companyInfoCarousel}>
                    <CompanyInfoHome/>
                </div>
                <LoadCardList />
        </>
    )
}

export default Homepage
