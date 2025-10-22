import React from 'react';
import { Customer } from '../../types';
import './Customers.css';

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: number, name: string) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, onClose, onEdit, onDelete }) => {
  // Mock de pedidos do cliente
  const mockOrders = [
    { id: 101, date: '2025-10-22', total: 289.90, status: 'Entregue' },
    { id: 98, date: '2025-10-15', total: 159.90, status: 'Entregue' },
    { id: 87, date: '2025-10-01', total: 449.50, status: 'Entregue' },
    { id: 75, date: '2025-09-20', total: 89.90, status: 'Entregue' },
    { id: 62, date: '2025-09-10', total: 329.00, status: 'Cancelado' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large customer-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">👤 Detalhes do Cliente</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="customer-details-content">
          {/* Informações Principais */}
          <div className="details-section">
            <div className="customer-avatar-large">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className="customer-main-info">
              <h2>{customer.name}</h2>
              <div className="customer-meta">
                <span className={`status-badge-large ${customer.isActive ? 'active' : 'inactive'}`}>
                  {customer.isActive ? '✓ Ativo' : '✕ Inativo'}
                </span>
                <span className="customer-id">ID: #{customer.id}</span>
              </div>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="customer-stats-grid">
            <div className="customer-stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-value">{customer.totalOrders || 0}</div>
              <div className="stat-label">Pedidos Realizados</div>
            </div>
            <div className="customer-stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value">R$ {(customer.totalSpent || 0).toFixed(2)}</div>
              <div className="stat-label">Total Gasto</div>
            </div>
            <div className="customer-stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">
                R$ {((customer.totalSpent || 0) / (customer.totalOrders || 1)).toFixed(2)}
              </div>
              <div className="stat-label">Ticket Médio</div>
            </div>
            <div className="customer-stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-value">
                {customer.lastOrderDate 
                  ? new Date(customer.lastOrderDate).toLocaleDateString('pt-BR')
                  : '-'}
              </div>
              <div className="stat-label">Último Pedido</div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="details-section">
            <h3 className="section-title">📞 Informações de Contato</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email:</label>
                <span>{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="info-item">
                  <label>Telefone:</label>
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer.cpf && (
                <div className="info-item">
                  <label>CPF:</label>
                  <span>{customer.cpf}</span>
                </div>
              )}
              {customer.birthDate && (
                <div className="info-item">
                  <label>Data de Nascimento:</label>
                  <span>{new Date(customer.birthDate).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              <div className="info-item">
                <label>Cliente desde:</label>
                <span>
                  {new Date(customer.createdAt || '').toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Endereços */}
          {customer.addresses && customer.addresses.length > 0 && (
            <div className="details-section">
              <h3 className="section-title">📍 Endereços</h3>
              <div className="addresses-list">
                {customer.addresses.map((address) => (
                  <div key={address.id} className="address-card">
                    {address.isDefault && (
                      <span className="default-badge">Padrão</span>
                    )}
                    <p>
                      <strong>{address.street}, {address.number}</strong>
                      {address.complement && <span> - {address.complement}</span>}
                    </p>
                    <p>{address.neighborhood} - {address.city}/{address.state}</p>
                    <p>CEP: {address.zipCode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Histórico de Pedidos */}
          <div className="details-section">
            <h3 className="section-title">📦 Histórico de Pedidos</h3>
            {customer.totalOrders && customer.totalOrders > 0 ? (
              <div className="orders-list">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Data</th>
                      <th>Valor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id}>
                        <td><strong>#{order.id}</strong></td>
                        <td>{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                        <td><strong>R$ {order.total.toFixed(2)}</strong></td>
                        <td>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-orders">Nenhum pedido realizado ainda</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Fechar
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => onEdit(customer)}
          >
            ✏️ Editar Dados
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(customer.id!, customer.name)}
          >
            🗑️ Excluir Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
