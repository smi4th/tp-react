import { Link, Outlet, useLocation } from "react-router";

export default function Layout() {
    const location = useLocation().pathname;

    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
}
