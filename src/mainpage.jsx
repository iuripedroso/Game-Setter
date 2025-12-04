import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import VideoFile from "./assets/video.mp4";
import reviewsData from "./data/userReviews.json";

// Configuração da API
const api = axios.create({
    baseURL: 'http://localhost:3001',
});

const FILE_URL = 'http://localhost:3001/files';

function MainPage({ goToProfile, goToMain }) {
    const [popularGames, setPopularGames] = useState([]);
    const navigate = useNavigate();

    // Função de Logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(); // Recarrega a página para o App.js notar que saiu
    };

    useEffect(() => {
        function shuffleStep(word) {
            let arr = word.split('');
            if (arr.length > 3) {
                let temp = arr[1];
                arr[1] = arr[arr.length - 2];
                arr[arr.length - 2] = temp;
            } else {
                arr = arr.reverse();
            }
            return arr;
        }

        const stepDuration = 100;
        document.querySelectorAll('.c-header-menu').forEach(link => {
            const spans = link.querySelectorAll('span');
            const originalText = Array.from(spans).map(s => s.textContent).join('');
            const reversedText = originalText.split('').reverse().join('');
            const shuffledText = shuffleStep(originalText).join('');

            const texts = [originalText.split(''), reversedText.split(''), shuffledText.split(''), originalText.split('')];

            link.addEventListener('mouseenter', () => {
                let step = 0;
                function nextStep() {
                    texts[step].forEach((char, i) => { if (spans[i]) spans[i].textContent = char; });
                    step++;
                    if (step < texts.length) setTimeout(nextStep, stepDuration);
                }
                nextStep();
            });
        });

        // --- Busca e Sorteia Jogos ---
        async function fetchGames() {
            try {
                const response = await api.get('/games');
                const allGames = response.data;
                const shuffledGames = allGames.sort(() => 0.5 - Math.random());
                setPopularGames(shuffledGames.slice(0, 30)); // agora são 30 jogos
            } catch (error) {
                console.error("Erro ao buscar jogos populares:", error);
            }
        }


        fetchGames();

    }, []);

    const getCoverUrl = (url) => {
        if (!url) return 'https://placehold.co/166x300?text=No+Cover';
        if (url.startsWith('http')) return url;
        return `${FILE_URL}/${url}`;
    };

    const StarRating = ({ rating }) => {
        const totalStars = 5;
        const fullStars = Math.floor(rating);
        const isHalf = rating % 1 !== 0;
        let stars = '★'.repeat(fullStars);
        if (isHalf) stars += '½';
        stars += '☆'.repeat(totalStars - Math.ceil(rating));
        return <span className="rating-stars">{stars}</span>;
    };

    return (
        <main className="main-container">
            <div className="video-area">
                <video className="background-video" src={VideoFile} autoPlay loop muted />

                <header className="overlay-header">
                    <a href="#" className="main-logo" onClick={(e) => { e.preventDefault(); if (goToMain) goToMain(); }}>
                        <div className="logo-pontos"><span></span><span></span><span></span></div>
                    </a>
                    <span className="main-logo">Gamesetter</span>

                    <nav className="itens">

                        <button className="c-header-menu" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => navigate('/main')}>
                            <span>H</span><span>o</span><span>m</span><span>e</span>
                        </button>


                        <button className="c-header-menu" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => navigate('/games')}>
                            <span>G</span><span>a</span><span>m</span><span>e</span><span>s</span>
                        </button>



                        <button className="c-header-menu" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => navigate('/profile')}>
                            <span>P</span><span>r</span><span>o</span><span>f</span><span>i</span><span>l</span><span>e</span>
                        </button>

                        <button className="c-header-menu" style={{ background: "none", border: "none", cursor: "pointer" }}
                            onClick={handleLogout}
                        >
                            <span>E</span><span>x</span><span>i</span><span>t</span>
                        </button>
                    </nav>
                </header>

                <div className="content">
                    <p>chaos has never looked this beautiful</p>
                    <h1>new: grand theft auto VI</h1>
                </div>

                <div className="content-trailer">
                    <div className="trailer-container">
                        <iframe src="https://www.youtube.com/embed/QdBZY2fkU-0" title="GTA VI Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className="reviews-section">
                <div className="reviews-header">
                    <h2>Popular Releases</h2>
                    {/* <a href="#">MORE</a> */}
                </div>


                <div className="popular">
                    {popularGames.length > 0 ? (
                        popularGames.map((game) => (
                            <div
                                key={game.id}
                                className="popular-card"
                                style={{ backgroundImage: `url(${getCoverUrl(game.cover_url)})` }}
                                title={game.title}
                                onClick={() => navigate(`/game/${game.id}`)}
                            >
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', color: '#999' }}>Carregando jogos...</p>
                    )}
                </div>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-about"><h2>GameSetter</h2><p>A place for gamers, reviews, trailers and chaos.</p></div>
                    <div className="footer-links"><h2>Explore</h2><ul><li><a href="#">Início</a></li><li><a href="#">Jogos</a></li><li><a href="#">Sobre</a></li></ul></div>
                    <div className="footer-social"><h2>Social</h2><ul><li><a href="#">Instagram</a></li><li><a href="#">GitHub</a></li><li><a href="#">YouTube</a></li></ul></div>
                    <div className="footer-newsletter"><h2>Newsletter</h2><p>Get updates on new releases and reviews</p><form><input type="email" placeholder="Seu email" /><button type="submit">Enviar</button></form></div>
                </div>
                <div className="footer-bottom"><p>© 2025 GameSetter — All rights reserved.</p></div>
            </footer>
        </main>
    );
}

export default MainPage;