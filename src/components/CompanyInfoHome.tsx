import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "react-router";
import backgroundImage from '@assets/photo.jpg';

export default function CompanyInfoHome() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">LockIn Paris 2e!</h1>
                    <p className="mb-5">
                        8 salles · 2 à 60 joueurs<br />
                        7 escape games immersives sur le thème de <span className={"text-red-600"}>l’horreur</span><br />
                        Espaces privatisables pour séminaire et teambuilding<br />
                        21 rue du Sentier Paris 2e
                    </p>
                    <Link to="/reservation" className="btn btn-primary btn-xl">
                        <CalendarMonthIcon />
                        Réserver en ligne
                    </Link>
                </div>
            </div>
        </div>
    );
}