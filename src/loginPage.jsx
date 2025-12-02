import React, { useState } from "react";
import "./login.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (email && senha) {
            onLogin();
        }
    }

    return (
        <div className="login-container">
            {/* Header estilo Letterboxd */}
            <header className="login-header">
                <a href="#" className="logo">
                    <div className="logo-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span className="logo-text">GameSetter</span>
                </a>

                <nav className="header-nav">
                    <a href="#">Sign In</a>
                    <a href="#">Create Account</a>
                    <a href="#">Games</a>
                    <a href="#">Lists</a>
                    <a href="#">Members</a>
                </nav>
            </header>

            {/* Hero com imagem de fundo */}
            <div className="login-hero">
                <img
                    src="https://wallpapers.com/images/hd/legend-of-zelda-1920-x-1028-background-s75gp9jonstkl085.jpg"
                    alt="Hero"
                    className="hero-image"
                />
                <div className="hero-overlay"></div>
            </div>

            {/* Conteúdo principal */}
            <div className="login-content">
                <div className="tagline">
                    <h2>
                        Track games you've played.<br />
                        Save those you want to play.<br />
                        Tell your friends what's good.
                    </h2>
                </div>

                <div className="login-box">
                    <h3>Sign In</h3>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Username or Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={lembrar}
                                    onChange={(e) => setLembrar(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <a href="#" className="forgot-inline">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="login-btn">
                            Sign In
                        </button>
                    </form>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn">
                            <span>G</span> Google
                        </button>
                        <button type="button" className="social-btn">
                            <span>🎮</span> Steam
                        </button>
                    </div>

                    <p className="signup-link">
                        New here? <a href="#">Create account</a>
                    </p>
                </div>

                <div className="login-footer">
                    <p>
                        © 2025 GameSetter. Made with ❤️ for gamers.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;