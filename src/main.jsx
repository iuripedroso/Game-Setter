import React, { useState } from "react";
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

export default App;
