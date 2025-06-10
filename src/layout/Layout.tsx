import {Link, Outlet, useLocation} from "react-router";
import App from "../App.tsx";

export default function Layout() {

    const location = useLocation().pathname;

    return (
        <>
            <div>
                <App />
                <Outlet/>
                <App />
            </div>
        </>
    );
}
