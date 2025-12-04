import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Joystick, X, Star, Pencil, Trash2 } from 'lucide-react';
import './GamePage.css';

const api = axios.create({ baseURL: 'http://localhost:3001' });
const FILE_URL = 'http://localhost:3001/files';

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [userReview, setUserReview] = useState(null); 

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    async function fetchData() {
      try {
        const gameRes = await api.get(`/games/${id}`);
        setGame(gameRes.data);

        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const reviewsRes = await api.get(`/reviews/games/${id}`, config);
        setReviews(reviewsRes.data);

        if (currentUser) {
            const myReview = reviewsRes.data.find(r => r.user_id === currentUser.id);
            setUserReview(myReview || null);
        }

        if (reviewsRes.data.length > 0) {
          const total = reviewsRes.data.reduce((acc, curr) => acc + curr.rating, 0);
          setAverageRating(total / reviewsRes.data.length);
        } else {
          setAverageRating(0);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        if (error.response && error.response.status === 404) {
             alert("Jogo não encontrado!");
             navigate('/');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, navigate, token]);

  const handleOpenModal = () => {
      if (userReview) {
          setNewRating(userReview.rating);
          setNewComment(userReview.comment);
      } else {
          setNewRating(0);
          setNewComment('');
      }
      setIsLogModalOpen(true);
  };

  const handleLogGame = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert("Você precisa estar logado para avaliar!");
      return;
    }

    if (newRating === 0) {
      alert("Selecione uma nota de 1 a 5!");
      return;
    }

    setIsSubmitting(true);
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      if (userReview) {
          await api.put(`/reviews/${userReview.id}`, {
            rating: newRating,
            comment: newComment
          });
          alert("Avaliação atualizada!");
      } else {
          await api.post(`/reviews/games/${id}`, {
            rating: newRating,
            comment: newComment
          });
          alert("Avaliação criada!");
      }

      window.location.reload(); 

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async () => {
      if (!userReview) return;
      const confirm = window.confirm("Tem certeza que deseja apagar sua review?");
      if (!confirm) return;

      setIsSubmitting(true);
      try {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        await api.delete(`/reviews/${userReview.id}`);
        alert("Review apagada.");
        window.location.reload();
      } catch (error) {
          console.error(error);
          alert("Erro ao apagar review.");
          setIsSubmitting(false);
      }
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/300x450?text=No+Cover';
    if (url.startsWith('http')) return url;
    return `${FILE_URL}/${url}`;
  };

  const getAvatarUrl = (user) => {
    if (!user || !user.avatar) return `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`;
    return `${FILE_URL}/${user.avatar}`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    return (
      <span className="star-display">
        {'★'.repeat(fullStars)}
        {hasHalf && '½'}
        <span style={{opacity: 0.3}}>{'★'.repeat(5 - Math.ceil(rating))}</span>
      </span>
    );
  };

  const renderInteractiveStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const currentVal = hoverRating || newRating;
      const isFilled = currentVal >= i;

      stars.push(
        <Star 
          key={i} 
          size={36} 
          className="modal-star"
          fill={isFilled ? "#00e054" : "#2c3440"} 
          color={isFilled ? "#00e054" : "#678"}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setNewRating(i)}
          style={{cursor: 'pointer', marginRight: 8, transition: 'transform 0.2s'}}
        />
      );
    }
    return (
        <div style={{display:'flex', alignItems:'center'}}>
            {stars}
            <span style={{marginLeft: 15, fontSize: '1.2rem', fontWeight: 'bold', color: newRating > 0 ? '#00e054' : '#666'}}>
                {newRating > 0 ? newRating : ''}
            </span>
        </div>
    );
  };

  // Handler para navegar ao perfil
  const handleUserClick = (userId) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  if (loading) return <div className="game-page-loading"><h2>Carregando...</h2></div>;
  if (!game) return null;

  const gameYear = game.release_date ? game.release_date.split('-')[0] : 'TBA';
  const description = game.description || "No description available.";
  const truncatedDescription = description.length > 280 ? description.substring(0, 280) + "..." : description;

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

            <p className="synopsis">
                {truncatedDescription}
            </p>
          </div>

          <div className="sidebar-wrapper">
            <div className="sidebar-panel">
              <div className="action-row">
                <button 
                    className="action-btn" 
                    onClick={handleOpenModal}
                    style={userReview ? {color: '#00e054'} : {}} 
                >
                    {userReview ? <Pencil /> : <Joystick />}
                    <span>{userReview ? "Edit" : "Log"}</span>
                </button>
              </div>

              <div className="rating-section">
                <div style={{fontSize: '0.8rem', color: '#9ab', marginBottom: '5px'}}>Average Rating</div>
                <div className="stars" style={{fontSize: '2rem', color: '#00e054'}}>
                    {averageRating > 0 ? averageRating.toFixed(1) : '-'}
                    <span style={{fontSize: '1rem', color:'#666', marginLeft: 5}}>★</span>
                </div>
                <div style={{fontSize: '0.7rem', color: '#666', marginTop: 5}}>
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="section-header">
            <span>Recent Reviews</span>
          </div>

          <div className="reviews-list">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                <div className="review-item" key={review.id}>
                    {/* AVATAR CLICÁVEL */}
                    <img 
                        src={getAvatarUrl(review.user)} 
                        alt="User Avatar" 
                        className="avatar" 
                        onClick={() => handleUserClick(review.user?.id)}
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                        onMouseOver={(e) => e.target.style.opacity = '0.8'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    />
                    
                    <div className="review-content">
                    {/* NOME CLICÁVEL */}
                    <h4 
                        onClick={() => handleUserClick(review.user?.id)}
                        style={{ cursor: 'pointer', width: 'fit-content' }}
                        className="review-username-link" // Opcional para CSS hover extra
                    >
                        {review.user?.name || "Unknown"} 
                        <span className="star-rating" style={{marginLeft: 10, color: '#00e054', fontSize: '1rem'}}>
                            {renderStars(review.rating)}
                        </span>
                        {currentUser && review.user_id === currentUser.id && (
                            <span style={{fontSize: '0.7rem', color: '#678', marginLeft: 10, border: '1px solid #456', padding: '2px 5px', borderRadius: 4}}>YOU</span>
                        )}
                    </h4>
                    <p className="review-text">{review.comment}</p>
                    <div className="review-footer">
                        <span style={{opacity: 0.5}}>Reviewed</span>
                        <span style={{marginLeft: 'auto'}}>❤️ Like</span>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p style={{color: '#666', fontStyle: 'italic', marginTop: 20}}>No reviews yet. Be the first to log this game!</p>
            )}
          </div>
        </div>
      </div>

      {isLogModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogModalOpen(false)}>
            <div className="modal-content log-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{userReview ? `Edit Review for ${game.title}` : `Log ${game.title}`}</h3>
                    <button className="close-modal-btn" onClick={() => setIsLogModalOpen(false)}><X /></button>
                </div>
                
                <form onSubmit={handleLogGame} className="modal-form">
                    <div className="game-preview-modal">
                         <img src={getImageUrl(game.cover_url)} alt="Cover" style={{width: 60, borderRadius: 4}}/>
                         <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                             <span style={{fontWeight:'bold', color:'white'}}>{game.title}</span>
                             <span style={{color:'#89a'}}>{gameYear}</span>
                         </div>
                    </div>

                    <div className="input-group" style={{marginTop: 20}}>
                        <label>Rating</label>
                        {renderInteractiveStars()}
                    </div>

                    <div className="input-group">
                        <label>Review</label>
                        <textarea 
                            rows="5"
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a review..."
                            style={{resize: 'none'}}
                        />
                    </div>

                    <div className="modal-actions" style={{justifyContent: 'space-between'}}>
                        {userReview ? (
                            <button type="button" onClick={handleDeleteReview} style={{background: 'none', border: 'none', color: '#ff4444', display:'flex', alignItems:'center', gap:5, cursor:'pointer'}}>
                                <Trash2 size={16} /> Delete
                            </button>
                        ) : (
                            <div></div>
                        )}

                        <button type="submit" className="save-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : (userReview ? "Update" : "Save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default GamePage;