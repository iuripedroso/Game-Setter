import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./mainpage";
import LoginPage from "./loginPage";

function App() {
    const [logado, setLogado] = useState(false);

    return (
        <>
            {!logado ? (
                <LoginPage onLogin={() => setLogado(true)} />
            ) : (
                <MainPage />
            )}
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
