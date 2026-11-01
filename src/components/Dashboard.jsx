import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../style/style.css";

const Dashboard = ({ username, onSignOut }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(
        () => window.matchMedia("(min-width: 761px)").matches
    );

    const handleSignOut = () => {
        onSignOut();
        navigate("/");
    };

    return (
        <div className={`container${menuOpen ? "" : " menu-collapsed"}`}>
            <Header
                menuOpen={menuOpen}
                onMenuToggle={() => setMenuOpen((open) => !open)}
            />
            <Sidebar username={username} onSignOut={handleSignOut} />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;