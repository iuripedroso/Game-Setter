import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Star, UserPlus, UserCheck } from 'lucide-react';
import './ProfilePage.css';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const FILE_URL = 'http://localhost:3001/files';

const ProfilePage = ({ goToMain, viewingUserId = null }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ films: 0, following: 0, followers: 0 });
  const [userReviews, setUserReviews] = useState([]);

  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // Estados do Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatarFile, setEditAvatarFile] = useState(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const token = localStorage.getItem('token');

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/150x225?text=No+Cover';
    if (url.startsWith('http')) return url;
    return `${FILE_URL}/${url}`;
  };

  // CORREÇÃO 1: Agora recebe o myId real para evitar erro 400 no backend
  const checkFollowStatus = async (myCurrentId, targetProfileId) => {
    try {
      // Usa o ID numérico/UUID em vez de 'me'
      const response = await api.get(`/users/${myCurrentId}/following`);
      const myFollowingList = response.data;

      const amIFollowing = myFollowingList.some(u => u.id === targetProfileId);
      setIsFollowing(amIFollowing);
    } catch (error) {
      console.error("Erro ao verificar follow status:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      if (!token) return;
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // 1. Quem sou eu? (Busca ID do logado)
      let meResponse;
      try {
        meResponse = await api.get('/users/me');
      } catch (err) {
        console.error("Sessão inválida. Deslogando...");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
        return;
      }

      const myId = meResponse.data.id;

      // 2. Define qual perfil carregar
      // Se viewingUserId for inválido ou igual a "undefined", assume que é o meu perfil
      let targetProfileId = myId;
      if (viewingUserId && viewingUserId !== 'undefined' && viewingUserId !== 'null') {
        targetProfileId = viewingUserId;
      }

      const isMyProfile = targetProfileId === myId;
      setIsOwnProfile(isMyProfile);

      // 3. Busca dados do usuário alvo
      let userData;
      if (isMyProfile) {
        userData = meResponse.data;
      } else {
        try {
          const userRes = await api.get(`/users/${targetProfileId}`);
          userData = userRes.data;

          // CORREÇÃO 1: Passamos myId explicitamente
          await checkFollowStatus(myId, targetProfileId);
        } catch (err) {
          console.warn("Perfil não encontrado no banco de dados.");
          setUser(null);
          setLoading(false);
          return;
        }
      }

      // 4. Carrega estatísticas em paralelo (com proteção contra falhas)
      const [followersRes, followingRes, reviewsRes] = await Promise.allSettled([
        api.get(`/users/${userData.id}/followers`),
        api.get(`/users/${userData.id}/following`),
        api.get(`/reviews/user/${userData.id}`)
      ]);

      setUser({
        ...userData,
        avatarUrl: userData.avatar
          ? `${FILE_URL}/${userData.avatar}`
          : `https://ui-avatars.com/api/?name=${userData.name}&background=random&color=fff`
      });

      const reviewsData = reviewsRes.status === 'fulfilled' ? reviewsRes.value.data : [];
      setUserReviews(reviewsData);

      setStats({
        films: reviewsData.length || 0,
        followers: followersRes.status === 'fulfilled' ? followersRes.value.data.length : 0,
        following: followingRes.status === 'fulfilled' ? followingRes.value.data.length : 0
      });

    } catch (error) {
      console.error("Erro fatal ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token, viewingUserId]);


  const handleFollowToggle = async () => {
    if (!user) return;
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api.post(`/users/${user.id}/follow`);

      setIsFollowing(!isFollowing);
      setStats(prev => ({
        ...prev,
        followers: !isFollowing ? prev.followers + 1 : prev.followers - 1
      }));

    } catch (error) {
      console.error("Erro ao seguir:", error);
      alert("Erro ao realizar ação.");
    }
  };

  // --- Funções do Modal ---
  const openEditModal = () => {
    setEditName(user.name);
    setEditBio(user.biography || '');
    setEditAvatarFile(null);
    setEditAvatarPreview(user.avatarUrl);
    setIsEditModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditAvatarFile(file);
      setEditAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      if (editAvatarFile) {
        const formData = new FormData();
        formData.append('avatar', editAvatarFile);
        await api.patch('/users/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await api.put('/users', {
        name: editName,
        biography: editBio,
      });

      alert("Perfil atualizado!");
      setIsEditModalOpen(false);
      fetchUserData();

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="profile-page-container"><h2>Carregando...</h2></div>;

  // CORREÇÃO 2: Tela de "Não Encontrado" mais bonita e com botão de voltar
  if (!user) return (
    <div className="profile-page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Usuário não encontrado.</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Este perfil pode ter sido deletado ou o link está incorreto.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#00e054',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Voltar para o Início
      </button>
    </div>
  );

  return (
    <div className="profile-page-container">
      <header className="profile-header">
        <a href="#" className="profile-logo" onClick={(e) => {
          e.preventDefault();
          if (goToMain) goToMain();
          else navigate('/');
        }}>
          <div className="profile-logo-pontos"><span></span><span></span><span></span></div>
        </a>
        <span className="profile-logo">Gamesetter</span>

        <nav className="itens">
          <button className="c-header-menu" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => navigate('/main')}>
            <span>H</span><span>o</span><span>m</span><span>e</span>
          </button>

        </nav>
      </header>


      <div className="content-wrapper">

        <div className="profile-section">
          <div className="avatar-container">
            <div className="avatar">
              <img src={user.avatarUrl} alt="Avatar" onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
            </div>
          </div>
          <div className="profile-main">
            <div className="profile-header-top">
              <h1 className="username">{user.name}</h1>

              {isOwnProfile ? (
                <button className="edit-profile-btn" onClick={openEditModal}>
                  Edit Profile
                </button>
              ) : (
                <button
                  className={`edit-profile-btn ${isFollowing ? 'following-btn' : 'follow-btn'}`}
                  onClick={handleFollowToggle}
                  style={{
                    backgroundColor: isFollowing ? '#2c3440' : '#00e054',
                    color: '#fff',
                    border: isFollowing ? '1px solid #445566' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (isFollowing) {
                      e.currentTarget.textContent = "Unfollow";
                      e.currentTarget.style.backgroundColor = "#ff4d4d";
                      e.currentTarget.style.borderColor = "#ff4d4d";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (isFollowing) {
                      e.currentTarget.innerHTML = "Following";
                      e.currentTarget.style.backgroundColor = "#2c3440";
                      e.currentTarget.style.borderColor = "#445566";
                    }
                  }}
                >
                  {isFollowing ? <>Following</> : <>Follow</>}
                </button>
              )}

            </div>
            <div className="user-info">
              <span>★ Brasil</span>
              <span>• {user.email}</span>
            </div>
            <div className="stats-row">
              <div className="stat"><strong>{stats.films}</strong> <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/games/${user.id}`); }}>Games</a></div>
              <div className="stat"><strong>{stats.following}</strong> <a href="#">Following</a></div>
              <div className="stat"><strong>{stats.followers}</strong> <a href="#">Followers</a></div>
            </div>
          </div>
        </div>

        <div className="profile-nav">
          <nav>
            <a href="#" className="active" onClick={(e) => e.preventDefault()}>Profile</a>
            {/* 👇 MUDANÇA AQUI: Redireciona para /games 👇 */}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/games/${user.id}`); }}>Games</a>
          </nav>
        </div>

        <div className="main-grid">
          <div className="main-content">
            <div className="section-header">
              <h2 className="section-title">Recent Reviews</h2>
              {/* <span style={{fontSize:'0.8rem', color:'#666'}}>Last 4 activities</span> */}
            </div>

            <div className="favorites-grid">
              {userReviews.length > 0 ? (
                userReviews.slice(0, 4).map((review) => (
                  <div
                    key={review.id}
                    className="film-poster"
                    title={`${review.game?.title} - ${review.rating}★`}
                    onClick={() => navigate(`/game/${review.game?.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={getImageUrl(review.game?.cover_url)}
                      alt={review.game?.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 5, right: 5,
                      background: 'rgba(0,0,0,0.8)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      fontSize: '0.8rem',
                      color: '#00e054'
                    }}>
                      ★ {review.rating}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666', gridColumn: '1 / -1' }}>Nenhum jogo avaliado ainda.</p>
              )}
            </div>
          </div>

          <aside className="sidebar">
            <div className="bio-box">
              <div className="bio-title">BIO</div>
              <p className="bio-text">{user.biography || "Sem biografia definida."}</p>
            </div>
          </aside>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="close-modal-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveProfile} className="modal-form">
              <div className="modal-avatar-section">
                <img src={editAvatarPreview} alt="Preview" className="avatar-preview" />
                <label htmlFor="modal-avatar-upload" className="modal-upload-btn">
                  Change Photo
                </label>
                <input id="modal-avatar-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>

              <div className="input-group">
                <label>Display Name</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />
              </div>

              <div className="input-group">
                <label>Biography</label>
                <textarea rows="4" value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Tell us about your favorite games..." />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;