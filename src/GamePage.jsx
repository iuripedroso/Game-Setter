import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, Heart, Clock, List, Joystick } from 'lucide-react';
import './GamePage.css';

const api = axios.create({ baseURL: 'http://localhost:3001' });
const FILE_URL = 'http://localhost:3001/files';

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await api.get(`/games/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error("Erro ao buscar jogo:", error);
        alert("Jogo não encontrado!");
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    fetchGame();
  }, [id, navigate]);

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/300x450?text=No+Cover';
    if (url.startsWith('http')) return url;
    return `${FILE_URL}/${url}`;
  };

  const reviews = [
    {
      user: "GameFan99",
      avatar: "https://ui-avatars.com/api/?name=Game+Fan&background=random",
      rating: 5,
      text: "Simplesmente incrível. A narrativa me prendeu do início ao fim.",
      likes: "120",
      isHeart: true
    },
    {
      user: "CriticoChato",
      avatar: "https://ui-avatars.com/api/?name=C+C&background=random",
      rating: 3.5,
      text: "Bom, mas poderia ser melhor otimizado.",
      likes: "45"
    }
  ];

  if (loading) return <div className="game-page-loading"><h2>Carregando...</h2></div>;
  if (!game) return null;

  const gameYear = game.release_date ? game.release_date.split('-')[0] : 'TBA';

  // --- LÓGICA PARA LIMITAR DESCRIÇÃO ---
  const MAX_DESC_LENGTH = 280; // Defina quantos caracteres quer
  const description = game.description || "No description available.";
  
  // Se for maior que o limite, corta e adiciona "..."
  const truncatedDescription = description.length > MAX_DESC_LENGTH 
    ? description.substring(0, MAX_DESC_LENGTH) + "..." 
    : description;
  // -------------------------------------

  return (
    <div className="game-page">
      <div className="hero-backdrop">
        <img src={getImageUrl(game.cover_url)} alt="Backdrop" />
      </div>

      <div className="lb-container">
        <div className="game-header-grid">
          <div className="poster-container">
            <img src={getImageUrl(game.cover_url)} alt={game.title} />
          </div>

          <div className="game-info">
            <h1 className="game-title">
              {game.title} 
              <span style={{fontWeight: 300, fontSize: '1.5rem', color: '#89a', marginLeft: '10px'}}>{gameYear}</span>
            </h1>
            
            <div className="game-meta">
              Published by <a href="#">{game.publisher || "Unknown Publisher"}</a>
            </div>

            {/* 👇 DESCRIÇÃO LIMITADA AQUI 👇 */}
            <p className="synopsis">
                {truncatedDescription}
                {description.length > MAX_DESC_LENGTH && (
                    <span style={{color: '#fff', fontWeight: 'bold', marginLeft: '5px', cursor: 'default', opacity: 0.7}}>
                        Ler mais
                    </span>
                )}
            </p>
          </div>

          <div className="sidebar-wrapper">
            <div className="sidebar-panel">
              <div className="action-row">
                <button className="action-btn"><Joystick /><span>Log</span></button>
                <button className="action-btn"><Clock /><span>Wishlist</span></button>
              </div>

              <div className="rating-section">
                <div style={{fontSize: '0.8rem', color: '#9ab', marginBottom: '5px'}}>Rate</div>
                <div className="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              </div>

              
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="section-header">
            <span>Popular Reviews</span>
            <span style={{cursor:'pointer'}}>More</span>
          </div>

          <div className="reviews-list">
            {reviews.map((review, idx) => (
              <div className="review-item" key={idx}>
                <img src={review.avatar} alt="User Avatar" className="avatar" />
                <div className="review-content">
                  <h4>{review.user} <span className="star-rating">{'★'.repeat(Math.floor(review.rating))}</span></h4>
                  <p className="review-text">{review.text}</p>
                  <div className="review-footer">
                    <Heart size={12} className={review.isHeart ? "like-heart" : ""} fill={review.isHeart ? "#ff8000" : "none"}/> 
                    <span>Like review</span>
                    <span style={{marginLeft: 'auto'}}>{review.likes} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;