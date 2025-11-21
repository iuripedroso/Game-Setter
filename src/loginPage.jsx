import React, { useState } from "react";
import "./login.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // coloque sua lógica de login aqui (verificar API, etc.)
        if (email && senha) {
            onLogin(); // chama função que troca pra MainPage
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>GameSetter</h1>
                <p className="subtitle">Bem-vindo de volta!</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <button type="submit">Entrar</button>
                </form>

                <a href="#" className="forgot">
                    Esqueceu sua senha?
                </a>
            </div>
        </div>
    );
}

export default LoginPage;
