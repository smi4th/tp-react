import styles from "../home.module.css"
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "react-router";

export default function CompanyInfoHome() {
    return (
        <>
            <div className={styles.companyInfo}>
                <div className={styles.companyInfoTitle}>Escape game Horreur à Paris :</div>
                <div>LockIn Paris 2e</div>
                <br/>
                <div>8 salles · 2 à 60 joueurs</div>
                <div>· 7 escape games immersives sur le thème de l’ horreur ·</div>
                <div className={styles.companyInfoTitle}>· Espaces privatisables pour séminaire et teambuilding ·</div>
                <div>21 rue du Sentier Paris 2</div>
                <br/>
                <Button size="large" variant="contained" sx={{width: 200, backgroundColor: '#e28743',
                    fontSize: '12px', fontWeight: 'bold'}}
                        className={styles.reserverButton}>
                    <CalendarMonthIcon/>
                    <Link to="/reservation">RÉSERVER EN LIGNE</Link>
                </Button>
            </div>
        </>
    )
}