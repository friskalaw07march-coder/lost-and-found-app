import profileImage from "../assets/zzy.jpg";
import "../style/style.css";

const Account = ({ username }) => (
    <section className="profile-page">
        <div className="profile-card">
            <img className="profile-page-avatar" src={profileImage} alt="" />
            <div>
                <p className="home-eyebrow">PROFIL PENGGUNA</p>
                <h2>{username || "Pengguna"}</h2>
                <p className="profile-page-description">
                    Profil akun Lost &amp; Found
                </p>
            </div>
        </div>
    </section>
);

export default Account;