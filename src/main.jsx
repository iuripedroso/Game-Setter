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

    return <MainPage 
        goToProfile={() => setPage("profile")}
        goToMain={() => setPage("main")}
    />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import ProfilePage from "./ProfilePage";
// import MainPage from "./mainpage";

// function App() {
//     const [page, setPage] = useState("profile"); 
//     // pode começar como "main" ou "profile"

//     if (page === "profile") {
//         return <ProfilePage goToMain={() => setPage("main")} />;
//     }

//     if (page === "main") {
//         return <MainPage goToProfile={() => setPage("profile")} />;
//     }
// }

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );
