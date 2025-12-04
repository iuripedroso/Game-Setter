import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const FILE_URL = 'http://localhost:3001/files';

const ProfilePage = ({ goToMain }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ films: 0, following: 0, followers: 0 });

  // --- NOVO: Estados para o Modal de Edição ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatarFile, setEditAvatarFile] = useState(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  // -------------------------------------------

  const token = localStorage.getItem('token');

  const fetchUserData = async () => {
    try {
      if (!token) return;
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const response = await api.get('/users/me');
      const userData = response.data;

      const followersReq = api.get(`/users/${userData.id}/followers`);
      const followingReq = api.get(`/users/${userData.id}/following`);
      
      const [followersRes, followingRes] = await Promise.all([followersReq, followingReq]);

      setUser({
        ...userData,
        avatarUrl: userData.avatar 
          ? `${FILE_URL}/${userData.avatar}` 
          : `https://ui-avatars.com/api/?name=${userData.name}&background=random&color=fff`
      });
      setStats({
        films: 0,
        followers: followersRes.data.length || 0,
        following: followingRes.data.length || 0
      });

    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  // --- NOVO: Funções do Modal ---

  // Abre o modal e preenche com os dados atuais
  const openEditModal = () => {
    setEditName(user.name);
    setEditBio(user.biography || '');
    setEditAvatarFile(null);
    setEditAvatarPreview(user.avatarUrl); // Começa com a foto atual
    setIsEditModalOpen(true);
  };

  // Lida com a seleção de nova foto (apenas preview, não envia ainda)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditAvatarFile(file);
      setEditAvatarPreview(URL.createObjectURL(file)); // Cria URL temporária pra mostrar na hora
    }
  };

  // Salva tudo (Foto e Texto)
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // 1. Se tiver foto nova, faz upload (PATCH /avatar)
      if (editAvatarFile) {
        const formData = new FormData();
        formData.append('avatar', editAvatarFile);
        await api.patch('/users/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // 2. Atualiza Nome e Bio (PUT /users)
      // OBS: Você precisa ter a rota PUT /users no backend para isso funcionar.
      // Se não tiver, veja o passo 3 da minha resposta.
      await api.put('/users', {
        name: editName,
        biography: editBio,
      });

      alert("Perfil atualizado com sucesso!");
      setIsEditModalOpen(false);
      fetchUserData(); // Recarrega os dados da tela principal

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao atualizar perfil.");
    } finally {
      setIsSaving(false);
    }
  };
  // -----------------------------


  const favoriteFilms = [
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/k079fR84R59TiwHw6F4J3tX4i9.jpg",
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pThyQovXQrw2m0s9x827XMiUAft.jpg",
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3b8Wsk1v5Le4644l5Qy7p0B6C.jpg",
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yLsuTi2q966zCjJdsZ9jCgH.jpg"
  ];

  if (loading) return <div className="profile-page-container"><h2>Carregando...</h2></div>;
  if (!user) return <div className="profile-page-container"><h2>Usuário não encontrado.</h2></div>;

  return (
    <div className="profile-page-container">
      <div className="content-wrapper">
          <header className="profile-header">
          <a href="#" className="profile-logo" onClick={(e) => { e.preventDefault(); if (goToMain) goToMain(); }}>
            <div className="profile-logo-pontos"><span></span><span></span><span></span></div>
          </a>
          <span className="profile-logo">Gamesetter</span>
        </header>
       
        <div className="profile-section">
          <div className="avatar-container">
            <div className="avatar">
              <img src={user.avatarUrl} alt="Avatar" onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
            </div>
          </div>
          <div className="profile-main">
            <div className="profile-header-top">
              <h1 className="username">{user.name}</h1>
              {/* Botão abre o Modal agora */}
              <button className="edit-profile-btn" onClick={openEditModal}>Edit Profile</button>
            </div>
            <div className="user-info">
              <span>★ Brasil</span> 
              <span>• {user.email}</span>
            </div>
            <div className="stats-row">
              <div className="stat"><strong>{stats.films}</strong> <a href="#">Games</a></div>
              <div className="stat"><strong>{stats.following}</strong> <a href="#">Following</a></div>
              <div className="stat"><strong>{stats.followers}</strong> <a href="#">Followers</a></div>
            </div>
          </div>
        </div>

        <div className="profile-nav">
          <nav>
            <a href="#" className="active">Profile</a>
            <a href="#">Reviews</a>
          </nav>
        </div>

        <div className="main-grid">
          <div className="main-content">
            <div className="section-header">
              <h2 className="section-title">Favorites</h2>
            </div>
            <div className="favorites-grid">
              {favoriteFilms.map((poster, idx) => (
                <div key={idx} className="film-poster">
                  <img src={poster} alt={`Favorite ${idx + 1}`} />
                </div>
              ))}
            </div>
            <p style={{color: '#666', marginTop: 20}}>* Histórico requer endpoints.</p>
          </div>

          <aside className="sidebar">
            <div className="bio-box">
              <div className="bio-title">BIO</div>
              <p className="bio-text">{user.biography || "Sem biografia definida."}</p>
            </div>
          </aside>
        </div>
      </div>

      {/* --- NOVO: ESTRUTURA DO MODAL --- */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="close-modal-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="modal-form">
              
              {/* Upload de Avatar no Modal */}
              <div className="modal-avatar-section">
                <img src={editAvatarPreview} alt="Preview" className="avatar-preview" />
                <label htmlFor="modal-avatar-upload" className="modal-upload-btn">
                  Change Photo
                </label>
                <input 
                  id="modal-avatar-upload" 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{display: 'none'}}
                />
              </div>

              <div className="input-group">
                <label>Display Name</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  required 
                />
              </div>

              <div className="input-group">
                <label>Biography</label>
                <textarea 
                  rows="4"
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell us about your favorite games..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ------------------------------- */}

    </div>
  );
};

export default ProfilePage;