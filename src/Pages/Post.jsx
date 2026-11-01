import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/style.css";

const Post = () => {
    const navigate = useNavigate();
    const [postType, setPostType] = useState("lost"); // 'lost' atau 'found'
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Dompet / Tas");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim() || !location.trim()) {
            alert("Harap lengkapi judul, lokasi, dan deskripsi barang.");
            return;
        }

        const newPost = {
            id: Date.now(),
            type: postType,
            title: title.trim(),
            category,
            location: location.trim(),
            date,
            description: description.trim(),
            contact: contact.trim(),
            postImage: imagePreview || "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=60",
            username: "Saya (Pelapor)",
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Simpan ke localStorage agar sinkron dengan feed Home
        const existingPosts = JSON.parse(localStorage.getItem("custom_posts") || "[]");
        localStorage.setItem("custom_posts", JSON.stringify([newPost, ...existingPosts]));

        setIsSubmitted(true);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1200);
    };

    return (
        <div className="post-page-wrapper">
            <div className="post-card-container">
                <div className="post-page-header">
                    <p className="home-eyebrow">FORMULIR LAPORAN</p>
                    <h2 className="post-page-title">Buat Laporan Barang</h2>
                    <p className="post-page-subtitle">
                        Bantu sesama menemukan barang hilang atau kembalikan barang yang Anda temukan.
                    </p>
                </div>

                {isSubmitted && (
                    <div className="post-success-alert">
                        ✅ Laporan berhasil diterbitkan! Mengalihkan ke beranda...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="post-form">
                    {/* Switcher Tipe Postingan */}
                    <div className="post-type-selector">
                        <button
                            type="button"
                            className={`type-btn ${postType === "lost" ? "active lost" : ""}`}
                            onClick={() => setPostType("lost")}
                        >
                            🔍 Saya Kehilangan Barang (Lost)
                        </button>
                        <button
                            type="button"
                            className={`type-btn ${postType === "found" ? "active found" : ""}`}
                            onClick={() => setPostType("found")}
                        >
                            📦 Saya Menemukan Barang (Found)
                        </button>
                    </div>

                    <div className="form-group-grid">
                        <div className="form-field">
                            <label htmlFor="post-title">Nama / Judul Barang *</label>
                            <input
                                id="post-title"
                                type="text"
                                placeholder="Contoh: Dompet Kulit Cokelat, Kunci Motor Honda"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="post-category">Kategori Barang</label>
                            <select
                                id="post-category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Dompet / Tas">Dompet / Tas</option>
                                <option value="Elektronik & Gadget">Elektronik & Gadget</option>
                                <option value="Kunci & Aksesoris">Kunci & Aksesoris</option>
                                <option value="Kartu / Dokumen Penting">Kartu / Dokumen Penting</option>
                                <option value="Pakaian / Jaket">Pakaian / Jaket</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group-grid">
                        <div className="form-field">
                            <label htmlFor="post-location">Lokasi Kejadian / Ditemukan *</label>
                            <input
                                id="post-location"
                                type="text"
                                placeholder="Contoh: Kantin Gedung C, Parkiran Motor Barat"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="post-date">Tanggal Kejadian</label>
                            <input
                                id="post-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="post-contact">Kontak WhatsApp / No. HP (Opsional)</label>
                        <input
                            id="post-contact"
                            type="tel"
                            placeholder="Contoh: 081234567890 (untuk dihubungi via WA/Chat)"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>

                    {/* Upload Foto Barang */}
                    <div className="form-field">
                        <label>Foto Barang</label>
                        <div className="image-upload-box">
                            {imagePreview ? (
                                <div className="image-preview-wrapper">
                                    <img src={imagePreview} alt="Preview Barang" className="uploaded-preview-img" />
                                    <button
                                        type="button"
                                        className="remove-img-btn"
                                        onClick={handleRemoveImage}
                                    >
                                        ✕ Hapus Foto
                                    </button>
                                </div>
                            ) : (
                                <label className="upload-dropzone">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden-file-input"
                                    />
                                    <span className="upload-icon">📷</span>
                                    <span className="upload-text">Klik untuk upload foto barang</span>
                                    <span className="upload-hint">Format JPG, PNG, atau JPEG (Maks. 5MB)</span>
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="post-desc">Deskripsi & Ciri-ciri Khusus *</label>
                        <textarea
                            id="post-desc"
                            rows={4}
                            placeholder="Jelaskan warna, tanda pengenal khusus, gantungan kunci, isi dompet, atau kronologi singkat..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="post-form-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Batal
                        </button>
                        <button type="submit" className="btn-primary">
                            🚀 Terbitkan Laporan Sekarang
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Post;
