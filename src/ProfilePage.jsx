import React from 'react';
import { MapPin, Settings, Star, AlignJustify } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  
  // Dados simulados baseados na imagem
  const user = {
    name: "yangabrielreis",
    handle: "yangabrielreis",
    avatar: "https://i.imgur.com/8Km9tLL.jpg",
    bio: "papo reto",
    location: "Brazil",
    stats: {
      films: 32,
      following: 12,
      followers: 16
    }
  };

  const recentActivity = [
    {
      id: 1,
      title: "Secret Agent",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/k079fR84R59TiwHw6F4J3tX4i9.jpg", // Exemplo genérico
      rating: 3.5,
      hasReview: true
    },
    {
      id: 2,
      title: "Knives Out",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pThyQovXQrw2m0s9x827XMiUAft.jpg",
      rating: 5,
      hasReview: true
    },
    {
      id: 3,
      title: "Tarantino's Mind",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3b8Wsk1v5Le4644l5Qy7p0B6C.jpg", // Placeholder
      rating: 5,
      hasReview: false
    },
    {
      id: 4,
      title: "Chuck Billy",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yLsuTi2q966zCjJdsZ9jCgH.jpg", // Placeholder
      rating: 4,
      hasReview: false
    }
  ];

  const watchlist = [
    "https://www.themoviedb.org/t/p/w200/k9X79k2t8xL9p2f9.jpg",
    "https://www.themoviedb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", 
    "https://www.themoviedb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "https://www.themoviedb.org/t/p/w200/8t8U0fT0.jpg"
  ];

  // Função helper para renderizar estrelas
  const renderStars = (rating) => {
    return (
      <div className="poster-meta">
        <span style={{fontSize: '12px'}}>★★★★★</span> 
        {/* Simulação visual simples. Para lógica real, use ícones repetidos */}
      </div>
    );
  };

  const handlePosterClick = (movieName) => {
    alert(`Você clicou no filme: ${movieName}`);
    // Aqui você colocaria a lógica de navegação
  };

  return (
    <div className="profile-page-container">
      
      {/* HEADER VERMELHO (Ignorado/Removido conforme pedido, mas o espaço existe no CSS se precisar) */}
      
      <div className="content-wrapper">
        
        {/* --- USER HEADER --- */}
        <header className="profile-header">
          <div className="avatar-container">
            <img src={user.avatar} alt="Avatar" />
          </div>

          <div className="profile-info">
            <div className="username-row">
              <h1>{user.name}</h1>
              <button className="edit-btn">Edit Profile</button>
            </div>
            
            <p className="tagline">{user.bio}</p>
            
            <div className="location-social">
              <span><MapPin size={14} /> {user.location}</span>
            </div>
          </div>

          {/* STATS (Topo Direito do Header) */}
          <div className="profile-stats">
            <a href="#" className="stat-item">
              <span className="stat-number">{user.stats.films}</span>
              <span className="stat-label">Films</span>
            </a>
            <a href="#" className="stat-item">
              <span className="stat-number">{user.stats.following}</span>
              <span className="stat-label">Following</span>
            </a>
            <a href="#" className="stat-item">
              <span className="stat-number">{user.stats.followers}</span>
              <span className="stat-label">Followers</span>
            </a>
          </div>
        </header>

        {/* --- MAIN GRID (2 Colunas) --- */}
        <div className="main-grid">
          
          {/* Esquerda: Conteúdo Principal */}
          <main className="left-column">
            
            {/* Seção Recent Activity */}
            <section className="activity-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <a href="#">All</a>
              </div>

              <div className="activity-grid">
                {recentActivity.map((item) => (
                  <button 
                    key={item.id} 
                    className="poster-btn" 
                    onClick={() => handlePosterClick(item.title)}
                    title={item.title}
                  >
                    <div className="poster-wrapper">
                      <img src={item.poster} alt={item.title} />
                    </div>
                    
                    {/* Estrelas e Ícone de Review */}
                    <div className="poster-meta" style={{marginTop: '5px', justifyContent: 'center'}}>
                      <span style={{color: '#00e054', fontSize: '10px'}}>★★★★</span>
                      {item.hasReview && <AlignJustify size={10} style={{marginLeft: '4px'}} />}
                    </div>
                  </button>
                ))}
              </div>
            </section>

          </main>

          {/* Direita: Sidebar */}
          <aside className="right-column">
            
            /* Seção Watchlist */
            <section className="watchlist-section">
                <div className="section-header">
                    <h2>Watchlist <span style={{color: '#fff', fontSize: '0.8rem'}}>34</span></h2>
                    <a href="#"></a>
                </div>

                <div className="watchlist-preview">
                    {watchlist.map((url, idx) => (
                        <button
                            key={idx}
                            className="watchlist-item"
                            onClick={() => handlePosterClick(`Watchlist ${idx + 1}`)}
                            title={`Watchlist ${idx + 1}`}
                            aria-label={`Open Watchlist item ${idx + 1}`}
                        >
                            <img src={url} alt={`Watchlist item ${idx + 1}`} />
                        </button>
                    ))}
                </div>
            </section>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;