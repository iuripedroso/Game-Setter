import React, { useState } from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom"; // Adicionei useParams e useNavigate

// Importe suas páginas
import MainPage from "./mainpage"; 
import LoginPage from "./loginPage";
import ProfilePage from "./ProfilePage";
import GamePage from "./GamePage"; 

const ProfileWrapper = () => {
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();
    
    return (
        <ProfilePage 
            viewingUserId={id} 
            goToMain={() => navigate('/')} 
        />
    );
};

function App() {
    const [logado, setLogado] = useState(() => {
        return localStorage.getItem('token') ? true : false;
    });

    const handleLogin = () => {
        setLogado(true);
    };

    // Se NÃO estiver logado, mostra o Login
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
                    element={<MainPage goToMain={() => {}} />} 
                />

                {/* 1. Rota do MEU Perfil (sem ID) */}
                <Route 
                    path="/profile" 
                    element={<ProfilePage goToMain={() => window.location.href='/'} />} 
                />

                {/* 2. Rota do Perfil de OUTROS (com ID) 
                    Usamos o Wrapper aqui para processar o ID antes de chamar a página */}
                <Route 
                    path="/profile/:id" 
                    element={<ProfileWrapper />} 
                />

                {/* Rota do Jogo */}
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