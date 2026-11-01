import { NavLink } from "react-router-dom";
import profileImage from "../assets/zzy.jpg";

const Sidebar = ({ username, onSignOut }) => (
    <aside className="dashboard-sidebar" id="dashboard-sidebar">
        <p className="sidebar-label">MENU</p>
        <nav className="dashboard-nav" aria-label="Menu utama">
            <NavLink to="/dashboard" end className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">⌂</span>
                <span>Beranda</span>
            </NavLink>
            <NavLink to="/dashboard/post" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">＋</span>
                <span>Post</span>
            </NavLink>
            <NavLink to="/dashboard/chat" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">✉</span>
                <span>Chat</span>
            </NavLink>
            <NavLink to="/dashboard/setting" className="dashboard-nav-link">
                <span className="nav-icon" aria-hidden="true">⚙</span>
                <span>Pengaturan</span>
            </NavLink>
        </nav>
        <p className="sidebar-help">Temukan barang, bantu kembalikan kepada pemiliknya.</p>
        <NavLink
            to="/dashboard/account"
            className="sidebar-profile-link"
            aria-label={`Buka profil ${username || "Pengguna"}`}
        >
            <img src={profileImage} alt="" className="sidebar-profile-avatar" />
            <span className="sidebar-profile-name">{username || "Pengguna"}</span>
            <span className="sidebar-profile-caption">Profil pengguna</span>
        </NavLink>
        <button
            type="button"
            className="sidebar-signout"
            onClick={onSignOut}
        >
            <span className="nav-icon" aria-hidden="true">↪</span>
            <span>Keluar</span>
        </button>
    </aside>
);

export default Sidebar;