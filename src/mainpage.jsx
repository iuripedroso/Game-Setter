import { useEffect } from "react";
import "./style.css";
import VideoFile from "./assets/video.mp4";
import reviewsData from "./data/userReviews.json";

function MainPage({ goToProfile, goToMain}) {

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

            const texts = [
                originalText.split(''),
                reversedText.split(''),
                shuffledText.split(''),
                originalText.split('')
            ];

            link.addEventListener('mouseenter', () => {
                let step = 0;

                function nextStep() {
                    texts[step].forEach((char, i) => {
                        if (spans[i]) spans[i].textContent = char;
                    });
                    step++;
                    if (step < texts.length) {
                        setTimeout(nextStep, stepDuration);
                    }
                }

                nextStep();
            });
        });
    }, []);

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
                    <a
                        href="#"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();
                            goToMain(); 
                        }}
                    >
                        <div className="logo-pontos">
                            <span></span>
                            <span></span>
                            <span></span>

                        </div>
                    </a>
                    <span className="logo">Gamesetter</span>

                    <nav className="itens">
                        <a href="#" className="c-header-menu">
                            <span>I</span><span>n</span><span>í</span><span>c</span><span>i</span><span>o</span>
                        </a>
                        <a href="#" className="c-header-menu">
                            <span>J</span><span>o</span><span>g</span><span>o</span><span>s</span>
                        </a>
                        <a href="#" className="c-header-menu">
                            <span>S</span><span>o</span><span>b</span><span>r</span><span>e</span>
                        </a>

                        <button
                            className="c-header-menu"
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                            onClick={goToProfile}
                        >
                            <span>P</span><span>e</span><span>r</span><span>f</span><span>i</span><span>l</span>
                        </button>
                    </nav>
                </header>

                <div className="content">
                    <p>chaos has never looked this beautiful</p>
                    <h1>new: grand theft auto VI</h1>
                </div>

                <div className="content-trailer">
                    <div className="content-trailer">
                        <div className="trailer-container">
                            <iframe
                                src="https://www.youtube.com/embed/QdBZY2fkU-0"
                                title="GTA VI Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="popularh2">
                <h2>popular releases</h2>
            </div>
            <div className="popular">
                <div className="popular01"></div>
                <div className="popular02"></div>
                <div className="popular03"></div>
                <div className="popular04"></div>
                <div className="popular05"></div>
            </div>

            <div className="reviews-section">
                <div className="reviews-header">
                    <h2>Popular Reviews With Friends</h2>
                    <a href="#">MORE</a>
                </div>

                <div className="reviews-grid">
                    {reviewsData.map((review) => (
                        <div key={review.id} className={`review-card ${review.compact ? 'compact-review' : ''}`}>
                            <div className="review-header-game">
                                <img
                                    src={review.gamePoster}
                                    alt={review.gameTitle}
                                    className="game-poster"
                                    onError={(e) => (e.target.src = "https://placehold.co/50x75")}
                                />
                                <div className="review-info">
                                    <div className="rating-user">
                                        <img
                                            src={review.userAvatar}
                                            alt={review.username}
                                            className="user-avatar"
                                            onError={(e) => (e.target.src = "https://placehold.co/25x25")}
                                        />
                                        <span className="user-info">{review.username}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <h3>{review.gameTitle}</h3>
                                    <p>{review.gameYear}</p>
                                </div>
                            </div>
                            <div className="review-text">{review.reviewText}</div>
                            <div className="review-actions">
                                <a href="#">❤️</a>
                                <span>{review.likes} likes</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-about">
                        <h2>GameSetter</h2>
                        <p>
                            A place for gamers, reviews, trailers and chaos.
                            Discover your next favorite game.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h2>Explore</h2>
                        <ul>
                            <li><a href="#">Início</a></li>
                            <li><a href="#">Jogos</a></li>
                            <li><a href="#">Sobre</a></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h2>Social</h2>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">YouTube</a></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h2>Newsletter</h2>
                        <p>Get updates on new releases and reviews</p>
                        <form>
                            <input type="email" placeholder="Seu email" />
                            <button type="submit">Enviar</button>
                        </form>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© 2025 GameSetter — All rights reserved.</p>
                </div>
            </footer>

        </main>
    );
}

export default MainPage;
