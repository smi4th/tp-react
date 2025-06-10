import './Homepage.css'
import CardList from "./sessions/CardList.tsx";
import CompanyInfoHome from "./companyInfo/CompanyInfoHome.tsx";
import styles from "./home.module.css"

function Homepage() {

    return (
        <>
                <div className={styles.companyInfoCarousel}>
                    <CompanyInfoHome/>
                </div>
                <CardList/>
        </>
    )
}

export default Homepage
