import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./mainpage";
import LoginPage from "./loginPage";
import GamePage from "./GamePage";
import ProfilePage from "./ProfilePage";
import "./GamePage.css";
import "./ProfilePage.css";

function App() {
  const [logado, setLogado] = useState(false);
  return (
    <>
      {!logado ? (
        <LoginPage onLogin={() => setLogado(true)} />
      ) : (
        <ProfilePage /> 
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);