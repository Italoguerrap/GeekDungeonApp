import React, { useState, useEffect } from 'react';
import { Banner } from '../../types';
import BannerForm from './BannerForm';
import './Banners.css';

const Banners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = () => {
    setLoading(true);
    setTimeout(() => {
      const mockBanners: Banner[] = [
        {
          id: 1,
          title: 'Black Friday 2025',
          imageUrl: 'https://via.placeholder.com/1200x400/667eea/ffffff?text=Black+Friday+2025',
          link: '/promocoes/black-friday',
          description: 'Até 70% de desconto em produtos selecionados',
          order: 1,
          isActive: true,
          validFrom: '2025-11-20',
          validUntil: '2025-11-30',
          createdAt: '2025-10-15',
        },
        {
          id: 2,
          title: 'Coleção Harry Potter',
          imageUrl: 'https://via.placeholder.com/1200x400/764ba2/ffffff?text=Harry+Potter',
          link: '/categorias/harry-potter',
          description: 'Novos produtos da saga mais amada',
          order: 2,
          isActive: true,
          createdAt: '2025-09-01',
        },
        {
          id: 3,
          title: 'Frete Grátis',
          imageUrl: 'https://via.placeholder.com/1200x400/43e97b/ffffff?text=Frete+Gratis',
          description: 'Frete grátis acima de R$ 200',
          order: 3,
          isActive: true,
          createdAt: '2025-08-10',
        },
      ];

      setBanners(mockBanners);
      setLoading(false);
    }, 800);
  };

  const handleCreate = () => {
    setEditingBanner(null);
    setShowModal(true);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setShowModal(true);
  };

  const handleSave = (banner: Banner) => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === banner.id ? banner : b));
    } else {
      const newBanner = { ...banner, id: Date.now(), createdAt: new Date().toISOString() };
      setBanners([...banners, newBanner]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este banner?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setBanners(banners.map(b =>
      b.id === id ? { ...b, isActive: !b.isActive } : b
    ));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newBanners = [...banners];
      [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
      setBanners(newBanners.map((b, i) => ({ ...b, order: i + 1 })));
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < banners.length - 1) {
      const newBanners = [...banners];
      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
      setBanners(newBanners.map((b, i) => ({ ...b, order: i + 1 })));
    }
  };

  return (
    <div className="banners-page">
      <div className="page-header">
        <div>
          <h2>🖼️ Banners</h2>
          <p className="page-subtitle">Gerencie os banners do carrossel da home</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Novo Banner
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando banners...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🖼️</div>
          <h3>Nenhum banner cadastrado</h3>
          <p>Crie banners para exibir no carrossel da home</p>
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Criar Banner
          </button>
        </div>
      ) : (
        <div className="banners-list">
          {banners.map((banner, index) => (
            <div key={banner.id} className={`banner-item ${!banner.isActive ? 'inactive' : ''}`}>
              <div className="banner-order">
                <button
                  className="order-btn"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  ▲
                </button>
                <span className="order-number">#{banner.order}</span>
                <button
                  className="order-btn"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === banners.length - 1}
                >
                  ▼
                </button>
              </div>

              <div className="banner-preview">
                <img src={banner.imageUrl} alt={banner.title} />
                {!banner.isActive && <div className="inactive-overlay">INATIVO</div>}
              </div>

              <div className="banner-info">
                <h3>{banner.title}</h3>
                <p>{banner.description}</p>
                {banner.link && <div className="banner-link">🔗 {banner.link}</div>}
                {banner.validFrom && banner.validUntil && (
                  <div className="banner-validity">
                    📅 {new Date(banner.validFrom).toLocaleDateString('pt-BR')} - {new Date(banner.validUntil).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>

              <div className="banner-actions">
                <button
                  className={`btn ${banner.isActive ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => handleToggleStatus(banner.id!)}
                >
                  {banner.isActive ? '⏸️ Desativar' : '▶️ Ativar'}
                </button>
                <button className="btn btn-outline" onClick={() => handleEdit(banner)}>
                  ✏️ Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(banner.id!)}>
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <BannerForm
          banner={editingBanner}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Banners;
