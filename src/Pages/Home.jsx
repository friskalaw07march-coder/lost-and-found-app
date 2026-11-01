import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import initialData from "../data.jsx/data.jsx";
import "../style/style.css";

const Home = ({ username }) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [reportCounts, setReportCounts] = useState({});
    const [allPosts, setAllPosts] = useState(() => {
        const custom = JSON.parse(localStorage.getItem("custom_posts") || "[]");
        return [...custom, ...initialData];
    });

    useEffect(() => {
        const custom = JSON.parse(localStorage.getItem("custom_posts") || "[]");
        setAllPosts([...custom, ...initialData]);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const value = event.target.search.value.trim();
        setKeyword(value);
    };

    const handleReport = (postId) => {
        const confirmed = window.confirm("Yakin ingin melaporkan postingan ini?");
        if (confirmed) {
            setReportCounts((counts) => ({
                ...counts,
                [postId]: (counts[postId] || 0) + 1,
            }));
        }
    };

    const handleContact = (item) => {
        // Direct redirect ke chat membawa parameter nama pelapor dan barang
        const itemDesc = item.title || item.description.slice(0, 30);
        navigate(`/dashboard/chat?to=${encodeURIComponent(item.username)}&item=${encodeURIComponent(itemDesc)}`);
    };

    const filteredData = keyword
        ? allPosts.filter((item) =>
              (item.description && item.description.toLowerCase().includes(keyword.toLowerCase())) ||
              (item.title && item.title.toLowerCase().includes(keyword.toLowerCase()))
          )
        : allPosts;

    return (
        <div className="home">
            <div className="home-intro">
                <p className="home-eyebrow">SELAMAT DATANG</p>

                <h2 className="home-title">
                    Halo, {username || "Pengguna"}!
                </h2>

                <p className="home-description">
                    Barang hilang, Barang ditemukan, Kembali ke pemilik.
                </p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    name="search"
                    placeholder="Cari deskripsi atau nama barang..."
                />

                <button type="submit">Cari</button>
            </form>

            <div className="feed-heading">
                <h3>Postingan terbaru</h3>
                <span>{filteredData.length} postingan</span>
            </div>

            <div className="feed">
                {filteredData.length === 0 ? (
                    <p className="empty-state">
                        Tidak ada postingan yang cocok.
                    </p>
                ) : (
                    filteredData.map((item) => (
                        <div key={item.id} className="post-card">
                            <div className="post-header">
                                <img
                                    className="avatar"
                                    src={item.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60"}
                                    alt={item.username}
                                />

                                <div>
                                    <strong>{item.username}</strong>
                                    {item.type && (
                                        <span className={`post-badge ${item.type}`}>
                                            {item.type === "lost" ? "Hilang" : "Ditemukan"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <img
                                className="post-image"
                                src={item.postImage}
                                alt={item.description}
                            />

                            <div className="post-actions">
                                <button
                                    type="button"
                                    className="post-chat-btn"
                                    onClick={() => handleContact(item)}
                                    title="Hubungi Penemu / Pemilik via Chat"
                                >
                                    💬 <span>Hubungi</span>
                                </button>
                                <button
                                    type="button"
                                    className="post-report"
                                    onClick={() => handleReport(item.id)}
                                    aria-label={`Laporkan postingan, ${reportCounts[item.id] || 0} laporan`}
                                >
                                    ⚑ <span>Laporkan</span>
                                    <span className="report-count">
                                        {reportCounts[item.id] || 0}
                                    </span>
                                </button>
                            </div>

                            <div className="post-caption">
                                <strong>{item.username}</strong>{" "}
                                <span>{item.description}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default Home;
