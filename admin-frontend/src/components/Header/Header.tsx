import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, type: 'order', message: 'Novo pedido #1234 recebido', time: '5 min atrás', unread: true },
    { id: 2, type: 'stock', message: 'Produto "Camiseta Naruto" com estoque baixo', time: '1 hora atrás', unread: true },
    { id: 3, type: 'customer', message: 'Novo cliente cadastrado: João Silva', time: '2 horas atrás', unread: true },
  ];

  const handleMarkAllAsRead = () => {
    console.log('Marcar todas como lidas');
    setShowNotifications(false);
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      console.log('Logout realizado');
      // Aqui você implementaria a lógica de logout
    }
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="page-title">Painel Administrativo</h1>
        </div>
        
        <div className="header-right">
          <div className="header-actions">
            {/* Notificações */}
            <div className="dropdown-container" ref={notifRef}>
              <button 
                className={`header-btn ${showNotifications ? 'active' : ''}`}
                title="Notificações"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="notification-badge">{notifications.length}</span>
                🔔
              </button>

              {showNotifications && (
                <div className="dropdown-menu notifications-dropdown">
                  <div className="dropdown-header">
                    <h3>Notificações</h3>
                    <button className="text-btn" onClick={handleMarkAllAsRead}>
                      Marcar como lidas
                    </button>
                  </div>
                  <div className="dropdown-body">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                        <div className="notification-icon">
                          {notif.type === 'order' && '📦'}
                          {notif.type === 'stock' && '⚠️'}
                          {notif.type === 'customer' && '👤'}
                        </div>
                        <div className="notification-content">
                          <p className="notification-message">{notif.message}</p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <button className="text-btn">Ver todas as notificações</button>
                  </div>
                </div>
              )}
            </div>

            {/* Menu do Usuário */}
            <div className="dropdown-container" ref={menuRef}>
              <button 
                className={`header-btn ${showUserMenu ? 'active' : ''}`}
                title="Menu do Usuário"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                ⚙️
              </button>

              {showUserMenu && (
                <div className="dropdown-menu user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <div className="user-avatar">👤</div>
                      <div>
                        <p className="user-name">Administrador</p>
                        <p className="user-email">admin@geekdungeon.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-body">
                    <button className="dropdown-item" onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}>
                      <span>👤</span>
                      Meu Perfil
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <span>🚪</span>
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
