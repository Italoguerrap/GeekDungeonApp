import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎮</span>
          <span className="logo-text">Geek Dungeon</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/categories" className="nav-item">
          <span className="nav-icon">📁</span>
          <span className="nav-text">Categorias</span>
        </NavLink>

        <NavLink to="/products" className="nav-item">
          <span className="nav-icon">👕</span>
          <span className="nav-text">Produtos</span>
        </NavLink>

        <NavLink to="/customers" className="nav-item">
          <span className="nav-icon">👥</span>
          <span className="nav-text">Clientes</span>
        </NavLink>

        <NavLink to="/orders" className="nav-item">
          <span className="nav-icon">📦</span>
          <span className="nav-text">Pedidos</span>
        </NavLink>

        <NavLink to="/coupons" className="nav-item">
          <span className="nav-icon">🎟️</span>
          <span className="nav-text">Cupons</span>
        </NavLink>

        <NavLink to="/banners" className="nav-item">
          <span className="nav-icon">🖼️</span>
          <span className="nav-text">Banners</span>
        </NavLink>

        <NavLink to="/reports" className="nav-item">
          <span className="nav-icon">📈</span>
          <span className="nav-text">Relatórios</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Configurações</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <div className="user-name">Admin</div>
            <div className="user-role">Administrador</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
