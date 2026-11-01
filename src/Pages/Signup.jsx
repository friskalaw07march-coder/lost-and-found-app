import { Link, useNavigate } from "react-router-dom";
import "../style/login-style.css";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSignup(formData.get("username"));
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-signup" aria-label="Sign up">
        <header className="auth-heading">
          <h1>Sign up</h1>
          <p>Buat akun Lost &amp; Found</p>
        </header>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="auth-field">
            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="Masukkan username"
              autoComplete="username"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-institution">Institution</label>
            <input
              id="signup-institution"
              name="institution"
              type="text"
              placeholder="Nama institusi"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-city">City</label>
            <input
              id="signup-city"
              name="city"
              type="text"
              placeholder="Nama kota"
              autoComplete="address-level2"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Buat password"
              autoComplete="new-password"
              required
            />
          </div>

          <button className="auth-submit" type="submit">Sign up</button>
        </form>

        <p className="auth-switch">
          Sudah punya akun? <Link to="/">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;
