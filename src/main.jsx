import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"; // Se for Vite moderno, isso fica no main.jsx, mas se estiver aqui, pode manter
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importe suas páginas
import MainPage from "./mainpage"; // Verifique se o nome do arquivo é mainpage ou MainPage
import LoginPage from "./loginPage";
import ProfilePage from "./ProfilePage";
import GamePage from "./GamePage"; // Ajuste o caminho conforme onde vc salvou o GamePage

function App() {
    // Tenta recuperar se o usuário já estava logado antes (opcional, mas bom)
    const [logado, setLogado] = useState(() => {
        return localStorage.getItem('token') ? true : false;
    });

    const handleLogin = () => {
        setLogado(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLogado(false);
    };

    // Se NÃO estiver logado, mostra o Login
    // (Poderíamos usar rotas protegidas, mas assim é mais simples por enquanto)
    if (!logado) {
        return <LoginPage onLogin={handleLogin} />;
    }

    // Se ESTIVER logado, carrega o sistema de Rotas
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota da Home */}
                <Route 
                    path="/" 
                    element={<MainPage goToProfile={() => {}} goToMain={() => {}} />} 
                />

                {/* Rota do Perfil */}
                <Route 
                    path="/profile" 
                    element={<ProfilePage goToMain={() => {}} />} 
                />

                {/* 👇 ROTA NOVA: Jogo Específico (O :id pega o numero do jogo) */}
                <Route 
                    path="/game/:id" 
                    element={<GamePage />} 
                />

                {/* Se digitar url errada, volta pra home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}