import React, { useState } from "react";
import "./login.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [showSignupBox, setShowSignupBox] = useState(false);
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit() {
        if (email && senha) {
            onLogin();
        }
    }

    function handleSignup() {
        if (signupEmail && signupPassword && confirmPassword) {
            if (signupPassword === confirmPassword) {
                onLogin();
            } else {
                alert("Passwords don't match!");
            }
        }
    }

    return (
        <div className="login-container">
            <header className="login-header">
                <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
                    <div className="logo-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span className="logo-text">GameSetter</span>
                </a>

                <nav className="header-nav">
                    <a onClick={(e) => { e.preventDefault(); setShowLoginBox(true); }}>
                        Sign In
                    </a>
                    <a onClick={(e) => { e.preventDefault(); setShowSignupBox(true); }}>
                        Create Account
                    </a>
                </nav>
            </header>

            <div className="login-hero">
                <div className="tagline">

                    <h2>
                        Track games you've played.
                    </h2>
                    
                    <p>
                        
                        by: Iuri Pedroso | Yan Gabriel Reis | Herich Gabriel.

                        </p>
                    <button className="get-started-btn" onClick={() => setShowSignupBox(true)}>
                        Get Started!
                    </button>
                </div>
                

                <img
                    src="https://wallpapers.com/images/hd/legend-of-zelda-1920-x-1028-background-s75gp9jonstkl085.jpg"
                    alt="Hero"
                    className="hero-image"
                />
                <div className="hero-overlay"></div>
            </div>

            {showLoginBox && (
                <div className="popup-overlay" onClick={() => setShowLoginBox(false)}>
                    <div className="login-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowLoginBox(false)}>
                            ×
                        </button>
                        <h3>Sign In</h3>

                        <div className="login-form">
                            <div className="input-group">
                                <label>Username or Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
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
                                <a href="#" className="forgot-inline" onClick={(e) => e.preventDefault()}>
                                    Forgot password?
                                </a>
                            </div>

                            <button className="login-btn" onClick={handleSubmit}>
                                Sign In
                            </button>
                        </div>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <div className="social-login">
                            <button type="button" className="social-btn">
                                <span>G</span> Google
                            </button>
                            {/* <button type="button" className="social-btn">
                                 <span>🎮</span> Steam 
                            </button> */}
                        </div>

                        <p className="signup-link">
                            New here? <a href="#" onClick={(e) => { e.preventDefault(); setShowLoginBox(false); setShowSignupBox(true); }}>Create account</a>
                        </p>
                    </div>
                </div>
            )}

            {showSignupBox && (
                <div className="popup-overlay" onClick={() => setShowSignupBox(false)}>
                    <div className="login-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowSignupBox(false)}>
                            ×
                        </button>
                        <h3>Create Account</h3>

                        <div className="login-form">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button className="login-btn" onClick={handleSignup}>
                                Create Account
                            </button>
                        </div>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <div className="social-login">
                            <button type="button" className="social-btn">
                                <span>G</span> Google
                            </button>
                            {/* <button type="button" className="social-btn">
                                <span>🎮</span> Steam
                            </button> */}
                        </div>

                        <p className="signup-link">
                            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowSignupBox(false); setShowLoginBox(true); }}>Sign in</a>
                        </p>
                    </div>
                </div>
            )}

            <div className="login-content"></div>
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-about">
                        <h2>GameSetter</h2>
                        <p>
                            A place for gamers, reviews, trailers and chaos.
                            Discover your next favorite game.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h2>Explore</h2>
                        <ul>
                            <li><a href="#">Início</a></li>
                            <li><a href="#">Jogos</a></li>
                            <li><a href="#">Sobre</a></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h2>Social</h2>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">YouTube</a></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h2>Newsletter</h2>
                        <p>Get updates on new releases and reviews</p>
                        <form>
                            <input type="email" placeholder="Seu email" />
                            <button type="submit">Enviar</button>
                        </form>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© 2025 GameSetter — All rights reserved.</p>
                </div>
            </footer>
        </div>

    );
}

export default LoginPage;