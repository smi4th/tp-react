import styles from "./layout.module.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GradeIcon from '@mui/icons-material/Grade';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.logoSection}>
                    <GoogleIcon sx={{color: 'white', 'font-size': ' 3.5rem'}}/>
                    <FacebookIcon sx={{color: 'white', 'font-size': ' 3.5rem'}}/>
                    <InstagramIcon sx={{color: 'white', 'font-size': ' 3.5rem'}}/>
                    <XIcon sx={{color: 'white', 'font-size': ' 3.5rem'}}/>
                </div>
                <div className={styles.entrepriseInfoSection}>
                    <div style={{'font-weight': 'bold'}}>LockIn Paris</div>
                    <div>5 <Grade number={5}/> </div>
                    <div>Basé sur 1000 avis</div>
                    <div>powered by Google</div>
                    <div>21 RUE DU SENTIER - PARIS 2e</div>
                    <br />
                    <div>Notre concept : Des escape games et expériences immersives spécialisées en horreur,
                        en plein cœur de Paris 2e (75),
                        pour particuliers et entreprises jusqu’à 80 personnes,
                        avec plusieurs salles privatisables pour team building
                        ou événements d’entreprise.
                    </div>
                </div>
                <div>Sessions details</div>
                <div className={styles.contactLegalSection}>
                    <div style={{'font-weight': 'bold'}}>Contact</div>
                    <div><PhoneIcon /> 01 84 25 82 18</div>
                    <div><EmailIcon /> Formulaire de contact</div>
                    <div>Mentions légales CGV</div>
                    <div>À propos</div>
                    <div>Recrutement</div>

                </div>
            </div>
        </>
    )
}

function Grade({ number }) {
    const result = []
    for (let i = 0; i<number; i++) {
       result.push(<GradeIcon />)
    }
    return result;
}