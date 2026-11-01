import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logoimg from "../assets/logo.jpeg";

const Header = ({ menuOpen, onMenuToggle }) => (
    <>
        <div className="dashboard-brand">
            <img src={Logoimg} alt="" className="dashboard-logo" />
            <span>L&F</span>
        </div>
        <header className="dashboard-header">
            <div className="dashboard-header-title">
                <IconButton
                    className="dashboard-menu-toggle"
                    onClick={onMenuToggle}
                    aria-label={menuOpen ? "Sembunyikan menu" : "Tampilkan menu"}
                    aria-expanded={menuOpen}
                    aria-controls="dashboard-sidebar"
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                <div>
                <p className="header-eyebrow">LOST & FOUND</p>
                <h1 id="title">Dashboard</h1>
                </div>
            </div>
        </header>
    </>
);

export default Header;