import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import zzy from "../assets/zzy.jpg";
import ding from "../assets/ding.jpg";
import profileImage from "../assets/zzy.jpg";
import "../style/style.css";

const INITIAL_CONVERSATIONS = [
    {
        id: "zayn",
        name: "Zayn0416",
        avatar: zzy,
        itemName: "Dompet Kuning di Kantin",
        status: "Online",
        unread: 1,
        messages: [
            {
                id: 1,
                sender: "Zayn0416",
                text: "Halo kak, apakah dompet kuning yang ditemukan di kantin masih ada?",
                time: "10:15",
                isMe: false,
            },
            {
                id: 2,
                sender: "Me",
                text: "Halo! Masih ada kak, saya simpan di pos satpam Gedung C ya.",
                time: "10:18",
                isMe: true,
            },
            {
                id: 3,
                sender: "Zayn0416",
                text: "Alhamdulillah, terima kasih banyak! Nanti siang saya ambil ke sana.",
                time: "10:20",
                isMe: false,
            },
        ],
    },
    {
        id: "ding",
        name: "Ding0202",
        avatar: ding,
        itemName: "Kunci Ditemukan di Parkiran B",
        status: "Offline",
        unread: 0,
        messages: [
            {
                id: 1,
                sender: "Ding0202",
                text: "Kunci motor Honda dengan gantungan hitam saya temukan di dekat tiang P3 ya.",
                time: "Kemarin",
                isMe: false,
            },
        ],
    },
];

const Chat = () => {
    const [searchParams] = useSearchParams();
    const queryUser = searchParams.get("to");
    const queryItem = searchParams.get("item");

    const [conversations, setConversations] = useState(() => {
        const saved = localStorage.getItem("app_chats");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return INITIAL_CONVERSATIONS;
            }
        }
        return INITIAL_CONVERSATIONS;
    });

    const [activeChatId, setActiveChatId] = useState(() => {
        return conversations[0]?.id || "zayn";
    });

    const [inputText, setInputText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const messagesEndRef = useRef(null);

    // Otomatis arahkan chat jika dibuka dari Home ("Hubungi Penemu")
    useEffect(() => {
        if (queryUser) {
            const existing = conversations.find(
                (c) => c.name.toLowerCase() === queryUser.toLowerCase()
            );

            if (existing) {
                setActiveChatId(existing.id);
            } else {
                // Buat chat baru jika belum ada
                const newChat = {
                    id: `chat_${Date.now()}`,
                    name: queryUser,
                    avatar: profileImage,
                    itemName: queryItem || "Barang Temuan/Hilang",
                    status: "Online",
                    unread: 0,
                    messages: [
                        {
                            id: Date.now(),
                            sender: queryUser,
                            text: `Halo! Saya ingin menghubungi terkait postingan: "${queryItem || "barang"}"`,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            isMe: false,
                        },
                    ],
                };
                setConversations((prev) => [newChat, ...prev]);
                setActiveChatId(newChat.id);
            }
        }
    }, [queryUser, queryItem]);

    // Simpan history chat ke localStorage
    useEffect(() => {
        localStorage.setItem("app_chats", JSON.stringify(conversations));
    }, [conversations]);

    // Auto scroll ke pesan paling bawah
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChatId, conversations]);

    const activeChat =
        conversations.find((c) => c.id === activeChatId) || conversations[0];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !activeChat) return;

        const newMessage = {
            id: Date.now(),
            sender: "Me",
            text: inputText.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMe: true,
        };

        setConversations((prev) =>
            prev.map((c) => {
                if (c.id === activeChat.id) {
                    return {
                        ...c,
                        messages: [...c.messages, newMessage],
                    };
                }
                return c;
            })
        );

        setInputText("");
    };

    const handleQuickReply = (text) => {
        if (!activeChat) return;
        const newMessage = {
            id: Date.now(),
            sender: "Me",
            text,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMe: true,
        };

        setConversations((prev) =>
            prev.map((c) => {
                if (c.id === activeChat.id) {
                    return {
                        ...c,
                        messages: [...c.messages, newMessage],
                    };
                }
                return c;
            })
        );
    };

    const filteredConversations = conversations.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chat-layout-container">
            {/* Sidebar Daftar Obrolan */}
            <div className="chat-sidebar-panel">
                <div className="chat-sidebar-header">
                    <h3>Pesan Masuk</h3>
                    <span className="chat-count-badge">{conversations.length}</span>
                </div>

                <div className="chat-search-bar">
                    <input
                        type="text"
                        placeholder="Cari nama atau barang..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="chat-list-items">
                    {filteredConversations.length === 0 ? (
                        <p className="no-chat-text">Tidak ada obrolan ditemukan.</p>
                    ) : (
                        filteredConversations.map((c) => {
                            const lastMsg = c.messages[c.messages.length - 1];
                            const isActive = c.id === activeChat?.id;

                            return (
                                <div
                                    key={c.id}
                                    className={`chat-item-card ${isActive ? "active" : ""}`}
                                    onClick={() => setActiveChatId(c.id)}
                                >
                                    <img src={c.avatar} alt={c.name} className="chat-avatar" />
                                    <div className="chat-item-info">
                                        <div className="chat-item-top">
                                            <strong className="chat-username">{c.name}</strong>
                                            <span className="chat-time">{lastMsg?.time || ""}</span>
                                        </div>
                                        <p className="chat-item-badge">📌 {c.itemName}</p>
                                        <p className="chat-last-message">
                                            {lastMsg ? (lastMsg.isMe ? "Anda: " : "") + lastMsg.text : "Belum ada pesan"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Panel Obrolan Aktif */}
            <div className="chat-main-panel">
                {activeChat ? (
                    <>
                        <div className="chat-active-header">
                            <div className="chat-user-status">
                                <img src={activeChat.avatar} alt={activeChat.name} className="chat-avatar" />
                                <div>
                                    <h4>{activeChat.name}</h4>
                                    <span className="chat-status-indicator">
                                        <span className={`status-dot ${activeChat.status.toLowerCase()}`}></span>
                                        {activeChat.status}
                                    </span>
                                </div>
                            </div>
                            <div className="chat-item-context">
                                <span className="context-label">Terkait:</span>
                                <strong>{activeChat.itemName}</strong>
                            </div>
                        </div>

                        {/* Area Percakapan */}
                        <div className="chat-messages-container">
                            <div className="chat-security-notice">
                                🔒 Pastikan bertransaksi atau bertemu untuk serah terima barang di tempat umum yang aman (seperti pos satpam atau lobi kampus).
                            </div>

                            {activeChat.messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`chat-bubble-row ${m.isMe ? "outgoing" : "incoming"}`}
                                >
                                    {!m.isMe && (
                                        <img src={activeChat.avatar} alt="" className="bubble-avatar" />
                                    )}
                                    <div className="chat-bubble">
                                        <p className="bubble-text">{m.text}</p>
                                        <span className="bubble-time">{m.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Action Chips */}
                        <div className="chat-quick-actions">
                            <button
                                type="button"
                                className="quick-chip"
                                onClick={() => handleQuickReply("Halo kak, barangnya masih ada?")}
                            >
                                👋 Masih ada?
                            </button>
                            <button
                                type="button"
                                className="quick-chip"
                                onClick={() => handleQuickReply("Bisa janjian ketemuan di pos satpam kampus?")}
                            >
                                📍 Janjian di Pos Satpam
                            </button>
                            <button
                                type="button"
                                className="quick-chip"
                                onClick={() => handleQuickReply("Saya punya bukti kepemilikan/tanda pengenal barang ini.")}
                            >
                                📄 Bukti Kepemilikan
                            </button>
                        </div>

                        {/* Input Chat */}
                        <form onSubmit={handleSendMessage} className="chat-input-bar">
                            <input
                                type="text"
                                placeholder="Ketik pesan untuk penemu/pemilik barang..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="submit" className="chat-send-btn">
                                Kirim ✉️
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <p>Pilih salah satu obrolan untuk mulai berkirim pesan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
