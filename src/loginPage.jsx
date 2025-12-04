import React, { useState } from "react";
import axios from "axios"; // 1. Importar Axios
import "./login.css";

// 2. Configurar a API
const api = axios.create({
    baseURL: "http://localhost:3001",
});

function LoginPage({ onLogin }) {
    // Estados do Login
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);
    
    // Estados de UI
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [showSignupBox, setShowSignupBox] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Para desabilitar botão enquanto carrega

    // Estados do Cadastro
    const [signupName, setSignupName] = useState(""); // Adicionado Nome
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // --- LÓGICA DE LOGIN (INTEGRADA) ---
    async function handleSubmit(e) {
        if(e) e.preventDefault(); // Evita recarregar a página
        
        if (!email || !senha) {
            alert("Preencha email e senha!");
            return;
        }

        setIsLoading(true);

        try {
            // Chamada ao Backend
            const response = await api.post('/sessions', {
                email: email,
                password: senha
            });

            const { token, user } = response.data;

            // Salvar no navegador
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Configura o token para próximas requisições
            api.defaults.headers.Authorization = `Bearer ${token}`;

            // Avisa o App que logou
            onLogin(); 

        } catch (error) {
            console.error(error);
            alert("Falha no login. Verifique email e senha.");
        } finally {
            setIsLoading(false);
        }
    }

    // --- LÓGICA DE CADASTRO (INTEGRADA) ---
    async function handleSignup(e) {
        if(e) e.preventDefault();

        if (!signupName || !signupEmail || !signupPassword || !confirmPassword) {
            alert("Preencha todos os campos!");
            return;
        }

        if (signupPassword !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        setIsLoading(true);

        try {
            // Chamada ao Backend para criar usuário
            await api.post('/users', {
                name: signupName,
                email: signupEmail,
                password: signupPassword,
                biography: "Novato no GameSetter" // Bio padrão opcional
            });

            alert("Conta criada com sucesso! Faça login agora.");
            
            // Troca as modais automaticamente
            setShowSignupBox(false);
            setShowLoginBox(true);
            // Preenche o email para facilitar
            setEmail(signupEmail); 
            setSenha("");

        } catch (error) {
            console.error(error);
            alert("Erro ao criar conta. O email pode já estar em uso.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-container">
            <header className="login-header">
                <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
                    <div className="logo-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <span className="logo-text">GameSetter</span>
                </a>

                <nav className="header-nav">
                    <a onClick={(e) => { e.preventDefault(); setShowLoginBox(true); }}>Sign In</a>
                    <a onClick={(e) => { e.preventDefault(); setShowSignupBox(true); }}>Create Account</a>
                </nav>
            </header>

            <div className="login-hero">
                <div className="tagline">
                    <h2>Track games you've played.</h2>
                    <p>by: Iuri Pedroso | Yan Gabriel Reis | Herich Gabriel.</p>
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

            {/* --- MODAL LOGIN --- */}
            {showLoginBox && (
                <div className="popup-overlay" onClick={() => setShowLoginBox(false)}>
                    <div className="login-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowLoginBox(false)}>×</button>
                        <h3>Sign In</h3>

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email</label>
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
                                <a href="#" className="forgot-inline" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                            </div>

                            <button className="login-btn" type="submit" disabled={isLoading}>
                                {isLoading ? "Carregando..." : "Sign In"}
                            </button>
                        </form>

                        <div className="divider"><span>or</span></div>
                        <p className="signup-link">
                            New here? <a href="#" onClick={(e) => { e.preventDefault(); setShowLoginBox(false); setShowSignupBox(true); }}>Create account</a>
                        </p>
                    </div>
                </div>
            )}

            {/* --- MODAL CADASTRO --- */}
            {showSignupBox && (
                <div className="popup-overlay" onClick={() => setShowSignupBox(false)}>
                    <div className="login-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowSignupBox(false)}>×</button>
                        <h3>Create Account</h3>

                        <form className="login-form" onSubmit={handleSignup}>
                            {/* ADICIONEI CAMPO NOME AQUI */}
                            <div className="input-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    placeholder="Your username"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="login-btn" type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Account"}
                            </button>
                        </form>

                        <div className="divider"><span>or</span></div>
                        <p className="signup-link">
                            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowSignupBox(false); setShowLoginBox(true); }}>Sign in</a>
                        </p>
                    </div>
                </div>
            )}

            <div className="login-content"></div>
            <footer className="footer">
                 {/* O Footer manteve-se igual */}
                <div className="footer-container">
                    <div className="footer-about">
                        <h2>GameSetter</h2>
                        <p>Discover your next favorite game.</p>
                    </div>
                    {/* ... Resto do footer ... */}
                    <div className="footer-bottom">
                        <p>© 2025 GameSetter — All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage;