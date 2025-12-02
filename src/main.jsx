import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./mainpage";
import LoginPage from "./loginPage";
import ProfilePage from "./ProfilePage";

function App() {
    const [logado, setLogado] = useState(false);
    const [page, setPage] = useState("main"); // main | profile

    if (!logado) {
        return <LoginPage onLogin={() => setLogado(true)} />;
    }

    if (page === "profile") {
        return <ProfilePage goToMain={() => setPage("main")} />;
    }

    return <MainPage goToProfile={() => setPage("profile")} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);