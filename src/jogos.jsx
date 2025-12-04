import React, { useState, useEffect } from "react";

export default function GamesScreen() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("title");
  const [filterRating, setFilterRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadUserGames();
  }, []);

  async function loadUserGames() {
    try {
      setIsLoading(true);
      
      const mockGames = [
        { id: 1, title: "The Last of Us", year: 2013, rating: 5, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg" },
        { id: 2, title: "God of War", year: 2018, rating: 5, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg" },
        { id: 3, title: "Red Dead Redemption 2", year: 2018, rating: 4, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg" },
        { id: 4, title: "Elden Ring", year: 2022, rating: 5, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg" },
        { id: 5, title: "Hollow Knight", year: 2017, rating: 5, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3pxp.jpg" },
        { id: 6, title: "Stardew Valley", year: 2016, rating: 4, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5qvj.jpg" },
        { id: 7, title: "Minecraft", year: 2011, rating: 5, platform: "Multi", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3qxu.jpg" },
        { id: 8, title: "Portal 2", year: 2011, rating: 5, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs5.jpg" },
        { id: 9, title: "Hades", year: 2020, rating: 5, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2i0o.jpg" },
        { id: 10, title: "Celeste", year: 2018, rating: 4, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rfy.jpg" },
        { id: 11, title: "Sekiro", year: 2019, rating: 4, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mqh.jpg" },
        { id: 12, title: "Bloodborne", year: 2015, rating: 5, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg" },
        { id: 13, title: "Dark Souls III", year: 2016, rating: 5, platform: "PC", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcg.jpg" },
        { id: 14, title: "Spider-Man", year: 2018, rating: 4, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg" },
        { id: 15, title: "Uncharted 4", year: 2016, rating: 4, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7t.jpg" },
        { id: 16, title: "Horizon Zero Dawn", year: 2017, rating: 4, platform: "PS4", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nzm.jpg" },
      ];
      
      setGames(mockGames);
      setFilteredGames(mockGames);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    } finally {
      setIsLoading(false);
    }
  }

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
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    setFilteredGames(result);
  }, [games, searchQuery, filterRating, sortBy]);

  const renderStars = (rating) => {
    return (
      <div className="rating-overlay">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star filled" : "star empty"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="games-screen">
      {/* Header */}
      <header className="games-header">
        <div className="header-wrapper">
          <a href="#" className="logo-link">
            <div className="logo-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="logo-text">GAMESETTER</span>
          </a>
          <nav className="header-nav">
            <a href="#">PROFILE</a>
            {/* <a href="#">LISTS</a> */}
            <a href="#" className="active">GAMES</a>
          </nav>
        </div>
      </header>

      {/* Page Title */}
      <div className="page-title">
        <h1>PLAYED</h1>
        <p className="games-count">{filteredGames.length} games</p>
      </div>

      {/* Filters Bar */}
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

            

                      </div>

          <div className="view-buttons">
            <button
              onClick={() => setViewMode("grid")}
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
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
              <div key={game.id} className="game-card">
                <div className="game-poster-wrapper">
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="game-poster"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x450/1c2229/9ab?text=No+Image";
                    }}
                  />
                  <div className="poster-overlay">
                    {renderStars(game.rating)}
                  </div>
                </div>
                <h3 className="game-title">{game.title}</h3>
                <p className="game-year">{game.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="games-list">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-list-item">
                <img
                  src={game.cover}
                  alt={game.title}
                  className="list-poster"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/64x96/1c2229/9ab?text=?";
                  }}
                />
                <div className="list-content">
                  <div className="list-info">
                    <h3>{game.title}</h3>
                    <p className="list-meta">{game.year} • {game.platform}</p>
                  </div>
                  <div className="list-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= game.rating ? "star filled" : "star empty"}
                      >
                        ★
                      </span>
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