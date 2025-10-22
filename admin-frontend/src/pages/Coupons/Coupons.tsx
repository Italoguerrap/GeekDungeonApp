import React, { useState, useEffect } from 'react';
import { Coupon, CouponType } from '../../types';
import CouponForm from './CouponForm';
import './Coupons.css';

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    setLoading(true);
    setTimeout(() => {
      const mockCoupons: Coupon[] = [
        {
          id: 1,
          code: 'PRIMEIRACOMPRA',
          description: 'Desconto para primeira compra',
          type: CouponType.Percentage,
          value: 15,
          minPurchase: 100,
          usageLimit: 100,
          usageCount: 45,
          validFrom: '2025-01-01',
          validUntil: '2025-12-31',
          isActive: true,
          createdAt: '2025-01-01',
        },
        {
          id: 2,
          code: 'BLACKFRIDAY',
          description: 'Mega desconto Black Friday',
          type: CouponType.Percentage,
          value: 30,
          minPurchase: 200,
          maxDiscount: 150,
          usageLimit: 500,
          usageCount: 320,
          validFrom: '2025-11-20',
          validUntil: '2025-11-30',
          isActive: true,
          createdAt: '2025-10-15',
        },
        {
          id: 3,
          code: 'FRETE10',
          description: 'R$10 de desconto no frete',
          type: CouponType.Fixed,
          value: 10,
          usageLimit: 200,
          usageCount: 87,
          validFrom: '2025-10-01',
          validUntil: '2025-10-31',
          isActive: true,
          createdAt: '2025-09-25',
        },
        {
          id: 4,
          code: 'NATAL2024',
          description: 'Promoção de Natal',
          type: CouponType.Percentage,
          value: 20,
          minPurchase: 150,
          usageLimit: 300,
          usageCount: 0,
          validFrom: '2025-12-15',
          validUntil: '2025-12-26',
          isActive: false,
          createdAt: '2025-10-20',
        },
      ];

      setCoupons(mockCoupons);
      setLoading(false);
    }, 800);
  };

  const handleCreate = () => {
    setEditingCoupon(null);
    setShowModal(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowModal(true);
  };

  const handleSave = (coupon: Coupon) => {
    if (editingCoupon) {
      setCoupons(coupons.map(c => c.id === coupon.id ? coupon : c));
    } else {
      const newCoupon = { ...coupon, id: Date.now(), usageCount: 0, createdAt: new Date().toISOString() };
      setCoupons([newCoupon, ...coupons]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cupom?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setCoupons(coupons.map(c =>
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(c => c.isActive).length;
  const totalUsage = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);

  return (
    <div className="coupons-page">
      <div className="page-header">
        <div>
          <h2>🎟️ Cupons de Desconto</h2>
          <p className="page-subtitle">Crie e gerencie cupons promocionais</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Novo Cupom
        </button>
      </div>

      {/* Estatísticas */}
      <div className="stats-row">
        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            🎟️
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{totalCoupons}</div>
            <div className="stat-mini-label">Total de Cupons</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            ✅
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{activeCoupons}</div>
            <div className="stat-mini-label">Cupons Ativos</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            📊
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{totalUsage}</div>
            <div className="stat-mini-label">Total de Usos</div>
          </div>
        </div>
      </div>

      {/* Busca */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar cupom por código ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Grid de Cupons */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando cupons...</p>
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎟️</div>
          <h3>Nenhum cupom encontrado</h3>
          <p>Crie cupons para oferecer descontos aos seus clientes</p>
          <button className="btn btn-primary" onClick={handleCreate}>
            ➕ Criar Cupom
          </button>
        </div>
      ) : (
        <div className="coupons-grid">
          {filteredCoupons.map((coupon) => (
            <div key={coupon.id} className={`coupon-card ${!coupon.isActive ? 'inactive' : ''}`}>
              <div className="coupon-header">
                <div className="coupon-code">{coupon.code}</div>
                <button
                  className={`status-toggle ${coupon.isActive ? 'active' : 'inactive'}`}
                  onClick={() => handleToggleStatus(coupon.id!)}
                >
                  {coupon.isActive ? '✓ Ativo' : '✕ Inativo'}
                </button>
              </div>

              <p className="coupon-description">{coupon.description}</p>

              <div className="coupon-value-display">
                {coupon.type === CouponType.Percentage ? (
                  <span className="discount-value">{coupon.value}% OFF</span>
                ) : (
                  <span className="discount-value">R$ {coupon.value.toFixed(2)} OFF</span>
                )}
              </div>

              <div className="coupon-details">
                {coupon.minPurchase && (
                  <div className="detail-item">
                    <span className="detail-label">Compra mínima:</span>
                    <span className="detail-value">R$ {coupon.minPurchase.toFixed(2)}</span>
                  </div>
                )}
                {coupon.maxDiscount && (
                  <div className="detail-item">
                    <span className="detail-label">Desconto máx:</span>
                    <span className="detail-value">R$ {coupon.maxDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Usos:</span>
                  <span className="detail-value">
                    {coupon.usageCount || 0} / {coupon.usageLimit || '∞'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Validade:</span>
                  <span className="detail-value">
                    {new Date(coupon.validFrom || '').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {new Date(coupon.validUntil || '').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="coupon-actions">
                <button className="btn btn-outline" onClick={() => handleEdit(coupon)}>
                  ✏️ Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(coupon.id!)}>
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Formulário */}
      {showModal && (
        <CouponForm
          coupon={editingCoupon}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Coupons;
