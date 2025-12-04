import React from 'react';
import { MapPin } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = ({ goToMain }) => {   // ⬅️ Adicionado aqui

  const user = {
    name: "yangabrielreis",
    handle: "yangabrielreis",
    avatar: "https://a.ltrbxd.com/resized/avatar/upload/6/2/5/2/2/9/4/shard/avtr-0-1000-0-1000-crop.jpg?v=0f75688c9f",
    bio: "papo reto",
    location: "Brazil",
    website: "letterboxd.com",
    stats: {
      films: 410,
      following: 90,
      followers: 90
    }
  };

  const favoriteFilms = [
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/k079fR84R59TiwHw6F4J3tX4i9.jpg",
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pThyQovXQrw2m0s9x827XMiUAft.jpg",
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3b8Wsk1v5Le4644l5Qy7p0B6C.jpg",
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yLsuTi2q966zCjJdsZ9jCgH.jpg"
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Secret Agent",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/k079fR84R59TiwHw6F4J3tX4i9.jpg",
      rating: 3
    },
    {
      id: 2,
      title: "Knives Out",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pThyQovXQrw2m0s9x827XMiUAft.jpg",
      rating: 3
    },
    {
      id: 3,
      title: "Tarantino's Mind",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3b8Wsk1v5Le4644l5Qy7p0B6C.jpg",
      rating: 3
    },
    {
      id: 4,
      title: "Chuck Billy",
      poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yLsuTi2q966zCjJdsZ9jCgH.jpg",
      rating: 3.5
    }
  ];

  const recentReviews = [
    {
      id: 1,
      title: "Pièce touchée",
      year: "1989",
      poster: "https://via.placeholder.com/80x120/2c3440/9ab?text=Film",
      rating: 5,
      date: "02 Sep 2025",
      text: "Cada dia que passa eu me sinto mais louco",
      likes: 1
    },
    {
      id: 2,
      title: "Nickel Boys",
      year: "2024",
      poster: "https://via.placeholder.com/80x120/2c3440/9ab?text=Film",
      rating: 4,
      date: "02 Mar 2025",
      text: "Se sou cúmplice a quem ou ao que então todos estão envolvidos nisso... A história de Nickel Boys grita diante de...",
      likes: 3
    }
  ];

  const popularReviews = [
    {
      id: 1,
      title: "Robot Dreams",
      year: "2023",
      poster: "https://via.placeholder.com/80x120/2c3440/9ab?text=Film",
      rating: 4,
      date: "22 Sep 2024",
      text: "A ausência de diálogos nas primeiras cenas dessa animação pode causar certa estranheza ou até me senti deslocado...",
      likes: 6
    }
  ];

  const watchlist = [
    "https://www.themoviedb.org/t/p/w200/k9X79k2t8xL9p2f9.jpg",
    "https://www.themoviedb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "https://www.themoviedb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "https://www.themoviedb.org/t/p/w200/8t8U0fT0.jpg"
  ];

  const diaryEntries = [
    { date: "Dec 24", title: "Diary of a Wimpy Kid" },
    { date: "Dec 19", title: "Pluto Junior" },
    { date: "Dec 17", title: "Joker: Folie à Deux" },
    { date: "Dec 17", title: "Life of Pi" },
    { date: "Dec 16", title: "The Secret Agent" }
  ];

  const following = Array(16).fill(null);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div className="review-stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
        {hasHalf && <span className="star half">½</span>}
      </div>
    );
  };

  const renderActivityStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div className="rating-overlay">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
        {hasHalf && <span className="star half">½</span>}
      </div>
    );
  };

  const handleClick = (item) => {
    alert(`Você clicou em: ${item}`);
  };

  return (
    <div className="profile-page-container">

      <div className="content-wrapper">

          <header className="profile-header">
          <a
            href="#"
            className="profile-logo"
            onClick={(e) => {
              e.preventDefault();
              if (goToMain) goToMain();   // ⬅️ corrigido (evita erro caso não seja passado)
            }}
          >
            <div className="profile-logo-pontos">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <span className="profile-logo">Gamesetter</span>
        </header>
       
        {/* Todo o resto permanece exatamente igual */}

        <div className="profile-section">
          <div className="avatar-container">
            <div className="avatar">
              <img src={user.avatar} alt="Avatar" />
            </div>
          </div>
          <div className="profile-main">
            <div className="profile-header-top">
              <h1 className="username">{user.name}</h1>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
            <div className="user-info">
              <span>★ {user.location}</span>
              <span>• {user.website}</span>
            </div>
            <div className="stats-row">
              <div className="stat"><strong>{user.stats.films}</strong> <a href="#">Games</a></div>
              <div className="stat"><strong>{user.stats.following}</strong> <a href="#">Following</a></div>
              <div className="stat"><strong>{user.stats.followers}</strong> <a href="#">Followers</a></div>
            </div>
          </div>
        </div>

      
        {/* Profile Navigation */}
        <div className="profile-nav">
          <nav>
            <a href="#" className="active">Profile</a>
            <a href="#">Films</a>

          </nav>
        </div>

        {/* Main Content Grid */}
        <div className="main-grid">

          {/* Left Column */}
          <div className="main-content">

            {/* Favorite Films */}
            <div className="section-header">
              <h2 className="section-title">Favorite Films</h2>
            </div>
            <div className="favorites-grid">
              {favoriteFilms.map((poster, idx) => (
                <div
                  key={idx}
                  className="film-poster"
                  onClick={() => handleClick(`Favorite Film ${idx + 1}`)}
                >
                  <img src={poster} alt={`Favorite ${idx + 1}`} />
                </div>
              ))}
            </div>

            <div className="section-header">
              <h2 className="section-title">Recent Activity</h2>
              <a href="#" className="section-link">All</a>
            </div>
            <div className="activity-grid">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="activity-poster"
                  onClick={() => handleClick(item.title)}
                >
                  <img src={item.poster} alt={item.title} />
                  {renderActivityStars(item.rating)}
                </div>
              ))}
            </div>

            <div className="section-header">
              <h2 className="section-title">Recent Reviews</h2>
              <a href="#" className="section-link">More</a>
            </div>

            {recentReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-poster">
                  <img src={review.poster} alt={review.title} />
                </div>
                <div className="review-content">
                  <h3>{review.title} <span>{review.year}</span></h3>
                  <div className="review-meta">
                    {renderStars(review.rating)}
                    <span className="review-date">Watched {review.date}</span>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="review-likes">♥ {review.likes} {review.likes === 1 ? 'like' : 'likes'}</div>
                </div>
              </div>
            ))}





            {/* Following */}
            <div className="section-header">
              <h2 className="section-title">Following</h2>
              <a href="#" className="section-link">{user.stats.following}</a>
            </div>
            <div className="following-grid">
              {following.map((_, idx) => (
                <div
                  key={idx}
                  className="following-avatar"
                  onClick={() => handleClick(`Following ${idx + 1}`)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="sidebar">

            {/* Bio */}
            <div className="bio-box">
              <div className="bio-title">BIO</div>
              <p className="bio-text">"Some sort of pressure must exist; the artist exists because the world is not perfect. Art would be useless if the world were perfect, as man wouldn't look for harmony but would simply live in it. Art is born out of an ill-designed world." - Andrei Tarkovsky</p>
            </div>

            {/* Watchlist */}
            <div className="section-header">
              <h2 className="section-title">Watchlist</h2>
            </div>
            <div className="watchlist-grid">
              {watchlist.map((url, idx) => (
                <div
                  key={idx}
                  className="film-poster"
                  onClick={() => handleClick(`Watchlist ${idx + 1}`)}
                >
                  <img src={url} alt={`Watchlist ${idx + 1}`} />
                </div>
              ))}
            </div>

            {/* Diary */}


            {/* Ratings Chart */}
            <div className="section-header">
              <h2 className="section-title">Ratings</h2>
              <a href="#" className="section-link">See all</a>
            </div>
            <div className="ratings-chart">
              <div className="chart-bars">
                <div className="bar" style={{ height: '10%' }}></div>
                <div className="bar" style={{ height: '15%' }}></div>
                <div className="bar" style={{ height: '25%' }}></div>
                <div className="bar" style={{ height: '35%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar" style={{ height: '75%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
                <div className="bar" style={{ height: '100%' }}></div>
                <div className="bar" style={{ height: '85%' }}></div>
                <div className="bar" style={{ height: '60%' }}></div>
              </div>
            </div>


          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;