import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // ADICIONE useParams
import "./jogos.css"; 

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const FILE_URL = 'http://localhost:3001/files';

export default function GamesScreen() {
  const navigate = useNavigate();
  const { id } = useParams(); // PEGA O ID DA URL (se existir)
  
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("PLAYED"); // Novo estado para o título
  
  // Filtros
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("title");
  const [filterRating, setFilterRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem('token');

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/300x450/1c2229/9ab?text=No+Cover';
    if (url.startsWith('http')) return url;
    return `${FILE_URL}/${url}`;
  };

  useEffect(() => {
    loadUserGames();
  }, [id]); // Recarrega se o ID mudar

  async function loadUserGames() {
    try {
      setIsLoading(true);

      if (!token) {
        navigate('/');
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      let targetUserId = id;

      // Se não veio ID na URL (ex: acessou /games direto), pega o meu ID
      if (!targetUserId) {
         const meResponse = await api.get('/users/me');
         targetUserId = meResponse.data.id;
      } else {
         // Se veio ID, vamos buscar o nome desse usuário para por no título (Opcional, mas fica chique)
         try {
            const userRes = await api.get(`/users/${targetUserId}`);
            setPageTitle(`${userRes.data.name}'s GAMES`);
         } catch (err) {
            setPageTitle("PLAYED");
         }
      }

      // Busca as reviews do usuário alvo (targetUserId)
      const reviewsResponse = await api.get(`/reviews/user/${targetUserId}`);
      const reviewsData = reviewsResponse.data;

      const formattedGames = reviewsData.map(review => {
        const game = review.game || {};
        return {
          id: review.id,
          realGameId: game.id,
          title: game.title || "Sem Título",
          year: game.release_date ? parseInt(game.release_date.split('-')[0]) : "N/A",
          rating: review.rating,
          platform: game.publisher || "PC",
          cover: getImageUrl(game.cover_url)
        };
      });
      
      setGames(formattedGames);
      setFilteredGames(formattedGames);

    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- EFEITOS DE FILTRO (IGUAIS) ---
  useEffect(() => {
    let result = [...games];

    if (searchQuery) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterRating !== "all") {
      result = result.filter(game => game.rating === parseInt(filterRating));
    }

    result.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "year") {
         const yearA = typeof a.year === 'number' ? a.year : 0;
         const yearB = typeof b.year === 'number' ? b.year : 0;
         return yearB - yearA;
      }
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    setFilteredGames(result);
  }, [games, searchQuery, filterRating, sortBy]);

  const renderStars = (rating) => {
    return (
      <div className="rating-overlay">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "star filled" : "star empty"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="games-screen">
      {/* Header */}
      <header className="games-header">
        <div className="header-wrapper">
          <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <div className="logo-dots"><span></span><span></span><span></span></div>
            <span className="logo-text">GAMESETTER</span>
          </a>
          <nav className="header-nav">
            {/* Ao clicar em Profile, volta para o perfil DO DONO DA LISTA (id) ou o meu se não tiver id */}
            <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                if(id) navigate(`/profile/${id}`); // Volta para o perfil do dono da lista
                else navigate('/profile');         // Volta para o meu perfil
            }}>PROFILE</a>
            <a href="#" className="active">GAMES</a>
          </nav>
        </div>
      </header>

      {/* Page Title Dinâmico */}
      <div className="page-title">
        <h1 style={{textTransform: 'uppercase'}}>{pageTitle}</h1> 
        <p className="games-count">{filteredGames.length} games</p>
      </div>

      {/* Filters Bar (Mantido igual) */}
      <div className="filters-wrapper">
        <div className="filters-bar">
          <div className="filters-left">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box"
            />
             <select className="filter-dropdown" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                <option value="all">ALL RATINGS</option>
                <option value="5">5 STARS</option>
                <option value="4">4 STARS</option>
                <option value="3">3 STARS</option>
                <option value="2">2 STARS</option>
                <option value="1">1 STAR</option>
            </select>
            <select className="filter-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="title">SORT BY TITLE</option>
                <option value="year">SORT BY YEAR</option>
                <option value="rating">SORT BY RATING</option>
            </select>
          </div>
          <div className="view-buttons">
            <button onClick={() => setViewMode("grid")} className={`view-btn ${viewMode === "grid" ? "active" : ""}`}>
               {/* SVG Grid */}
               <svg fill="currentColor" viewBox="0 0 20 20" width="20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button onClick={() => setViewMode("list")} className={`view-btn ${viewMode === "list" ? "active" : ""}`}>
               {/* SVG List */}
               <svg fill="currentColor" viewBox="0 0 20 20" width="20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Games Content */}
      <div className="games-wrapper">
        {isLoading ? (
          <div className="loading-state">Loading games...</div>
        ) : filteredGames.length === 0 ? (
          <div className="empty-state">No games found</div>
        ) : viewMode === "grid" ? (
          <div className="games-grid">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-card" onClick={() => navigate(`/game/${game.realGameId}`)}>
                <div className="game-poster-wrapper">
                  <img src={game.cover} alt={game.title} className="game-poster" />
                  <div className="poster-overlay">{renderStars(game.rating)}</div>
                </div>
                <h3 className="game-title">{game.title}</h3>
                <p className="game-year">{game.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="games-list">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-list-item" onClick={() => navigate(`/game/${game.realGameId}`)}>
                <img src={game.cover} alt={game.title} className="list-poster" />
                <div className="list-content">
                  <div className="list-info">
                    <h3>{game.title}</h3>
                    <p className="list-meta">{game.year} • {game.platform}</p>
                  </div>
                  <div className="list-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= game.rating ? "star filled" : "star empty"}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}