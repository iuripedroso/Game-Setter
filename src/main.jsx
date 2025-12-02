import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./mainpage";
import GamePage from "./GamePage";
import ProfilePage from "./ProfilePage";
import "./ProfilePage.css";
import "./GamePage.css";
 
function App() {
  return <ProfilePage/>;
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />);
