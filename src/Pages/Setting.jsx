import { useState } from "react";
import "../style/setting.css";

const Setting = ({ username, onUsernameChange }) => {
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState({
    itemNotifications: false,
    messageNotifications: false,
    publicProfile: false,
  });

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUsername = formData.get("name").trim();

    if (newUsername) {
      onUsernameChange(newUsername);
    }

    setSaved(true);
  };

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((current) => ({ ...current, [name]: checked }));
    setSaved(false);
  };

  return (
    <div className="settings-page">
      <header className="settings-heading">
        <div>
          <h2>Pengaturan</h2>
          <p className="settings-intro">
            Kelola profil dan preferensi akun Anda.
          </p>
        </div>
      </header>

      {saved && (
        <p className="settings-success" role="status">
          Pengaturan berhasil disimpan.
        </p>
      )}

      <form className="settings-form" onSubmit={handleSave}>
        <section className="settings-card">
          <div className="settings-card-heading">
            <div>
              <h3>Profil</h3>
              <p>Informasi dasar akun Anda.</p>
            </div>
          </div>

          <div className="settings-fields">
            <label className="settings-field" htmlFor="settings-name">
              <span>Nama</span>
              <input
                id="settings-name"
                name="name"
                type="text"
                placeholder="Masukkan nama"
                defaultValue={username}
                autoComplete="username"
                required
              />
            </label>

            <label className="settings-field" htmlFor="settings-email">
              <span>Email</span>
              <input
                id="settings-email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                autoComplete="email"
              />
            </label>

            <label className="settings-field" htmlFor="settings-phone">
              <span>Nomor telepon</span>
              <input
                id="settings-phone"
                name="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                autoComplete="tel"
              />
            </label>

            <label className="settings-field" htmlFor="settings-city">
              <span>Kota</span>
              <input
                id="settings-city"
                name="city"
                type="text"
                placeholder="Kota tempat tinggal"
                autoComplete="address-level2"
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div>
              <h3>Preferensi</h3>
              <p>Atur notifikasi dan visibilitas profil.</p>
            </div>
          </div>

          <label className="settings-toggle-row">
            <span>
              <strong>Notifikasi barang</strong>
              <small>Pembaruan barang hilang atau ditemukan.</small>
            </span>
            <input
              type="checkbox"
              name="itemNotifications"
              checked={preferences.itemNotifications}
              onChange={handlePreferenceChange}
            />
          </label>

          <label className="settings-toggle-row">
            <span>
              <strong>Notifikasi pesan</strong>
              <small>Pesan atau balasan baru.</small>
            </span>
            <input
              type="checkbox"
              name="messageNotifications"
              checked={preferences.messageNotifications}
              onChange={handlePreferenceChange}
            />
          </label>
          <label className="settings-toggle-row">
            <span>
              <strong>Tampilkan profil</strong>
              <small>Pengguna lain dapat melihat profil Anda.</small>
            </span>
            <input
              type="checkbox"
              name="publicProfile"
              checked={preferences.publicProfile}
              onChange={handlePreferenceChange}
            />
          </label>
        </section>

        <div className="settings-actions">
          <button type="submit">Simpan pengaturan</button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
