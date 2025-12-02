import React from 'react';
import { Eye, Heart, Clock, Star, List, Activity } from 'lucide-react';
import './GamePage.css';

const GamePage = () => {
  // Dados simulados do jogo (baseados nas suas imagens do Superman, adaptados)
  const gameData = {
    title: "Superman: Man of Steel",
    year: "2025",
    publisher: "Warner Bros. Games",
    tagline: "LOOK UP.",
    synopsis: "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent in this open-world action adventure.",
    poster: "https://www.metacritic.com/a/img/catalog/provider/6/3/6-1-9662-13.jpg", // Exemplo
    backdrop: "https://images6.alphacoders.com/133/1330235.jpeg", // Exemplo de wallpaper
    cast: [
      "David Corenswet", "Rachel Brosnahan", "Nicholas Hoult", 
      "Edi Gathegi", "Nathan Fillion", "Isabela Merced"
    ]
  };

  const reviews = [
    {
      user: "James (Schaffrillas)",
      avatar: "https://i.pravatar.cc/150?u=james",
      rating: 4.5,
      text: "Did Lex just call Superman a groomer? This game handles dialogue in such a weird way but the flight mechanics are peak.",
      likes: "16,151"
    },
    {
      user: "caparica",
      avatar: "https://i.pravatar.cc/150?u=caparica",
      rating: 4,
      text: "melhor jogo do superman. Finalmente acertaram a física da capa.",
      likes: "2,340",
      isHeart: true
    },
    {
      user: "justinwuah",
      avatar: "https://i.pravatar.cc/150?u=justin",
      rating: 5,
      text: "OH MY GOD... call me gal gadot the way i don't know how to act rn. The boss fight with Brainiac is insane.",
      likes: "103,668"
    }
  ];

  return (
    <div className="game-page">
      {/* 1. Backdrop (Fundo desfocado) */}
      <div className="hero-backdrop">
        <img src={gameData.backdrop} alt="Backdrop" />
      </div>

      <div className="lb-container">
        
        {/* 2. Grid Principal: Poster | Info | Sidebar */}
        <div className="game-header-grid">
          
          {/* Coluna Esquerda: Poster */}
          <div className="poster-container">
            <img src={gameData.poster} alt="Poster" />
          </div>

          {/* Coluna Meio: Informações */}
          <div className="game-info">
            <h1 className="game-title">
              {gameData.title} <span style={{fontWeight: 300, fontSize: '1.5rem', color: '#89a'}}>{gameData.year}</span>
            </h1>
            
            <div className="game-meta">
              Published by <a href="#">{gameData.publisher}</a>
            </div>

            <div className="tagline">{gameData.tagline}</div>

            <p className="synopsis">{gameData.synopsis}</p>

            

            
          </div>

          {/* Coluna Direita: Sidebar Panel (Igual à imagem ef045b) */}
          <div className="sidebar-wrapper">
            <div className="sidebar-panel">
              {/* Ícones de Ação */}
              <div className="action-row">
                <button className="action-btn">
                  <Eye />
                  <span>Play</span>
                </button>
                <button className="action-btn">
                  <Heart />
                  <span>Like</span>
                </button>
                <button className="action-btn">
                  <Clock />
                  <span>Wishlist</span>
                </button>
              </div>

              {/* Avaliação (Estrelas) */}
              <div className="rating-section">
                <div style={{fontSize: '0.8rem', color: '#9ab', marginBottom: '5px'}}>Rate</div>
                <div className="stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>

              {/* Links da Sidebar */}
              <div className="sidebar-links">
                
                <a href="#" className="sidebar-link">Review or log... <List size={16}/></a>
                
              </div>
            </div>
            
            
          </div>

        </div>

        {/* 3. Seção de Reviews (Inspirado em image_ef0418 e ef0435) */}
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
                  <h4>
                    {review.user} 
                    <span className="star-rating">
                      {/* Renderiza estrelas baseado no rating */}
                      {'★'.repeat(Math.floor(review.rating))}
                      {review.rating % 1 !== 0 && '½'}
                    </span>
                  </h4>
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