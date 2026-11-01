import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login-style.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username);
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-login" aria-label="Login">
        <header className="auth-heading">
          <h1>Login</h1>
          <p>Masuk ke akun Lost &amp; Found Anda</p>
        </header>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              type="text"
              placeholder="Masukkan username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="auth-submit" type="submit">Login</button>
        </form>

        <p className="auth-switch">
          Belum punya akun? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
