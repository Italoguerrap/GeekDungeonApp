import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Bem-vindo ao Painel Administrativo! 🎉</h2>
        <p>Gerencie suas categorias e produtos de forma fácil e rápida</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            📁
          </div>
          <div className="stat-info">
            <div className="stat-value">12</div>
            <div className="stat-label">Categorias</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            👕
          </div>
          <div className="stat-info">
            <div className="stat-value">48</div>
            <div className="stat-label">Produtos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            📦
          </div>
          <div className="stat-info">
            <div className="stat-value">156</div>
            <div className="stat-label">Pedidos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            💰
          </div>
          <div className="stat-info">
            <div className="stat-value">R$ 12.5k</div>
            <div className="stat-label">Faturamento</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Ações Rápidas</h3>
        <div className="actions-grid">
          <a href="/categories" className="action-card">
            <div className="action-icon">➕</div>
            <div className="action-title">Nova Categoria</div>
            <div className="action-description">Adicione uma nova categoria de produtos</div>
          </a>

          <a href="/products" className="action-card">
            <div className="action-icon">🛍️</div>
            <div className="action-title">Novo Produto</div>
            <div className="action-description">Cadastre um novo produto no sistema</div>
          </a>

          <a href="#" className="action-card">
            <div className="action-icon">📊</div>
            <div className="action-title">Relatórios</div>
            <div className="action-description">Visualize relatórios de vendas</div>
          </a>

          <a href="#" className="action-card">
            <div className="action-icon">⚙️</div>
            <div className="action-title">Configurações</div>
            <div className="action-description">Ajuste as configurações do sistema</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
