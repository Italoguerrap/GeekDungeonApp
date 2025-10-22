import React, { useState, useEffect } from 'react';
import { Customer } from '../../types';
import CustomerDetails from './CustomerDetails';
import CustomerForm from './CustomerForm';
import './Customers.css';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Mock data
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    setLoading(true);
    setTimeout(() => {
      const mockCustomers: Customer[] = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao.silva@email.com',
          phone: '(11) 98765-4321',
          cpf: '123.456.789-00',
          birthDate: '1990-05-15',
          isActive: true,
          totalOrders: 12,
          totalSpent: 1450.80,
          lastOrderDate: '2025-10-20',
          addresses: [
            {
              id: 1,
              street: 'Rua das Flores',
              number: '123',
              complement: 'Apto 45',
              neighborhood: 'Centro',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01234-567',
              isDefault: true,
            }
          ],
          createdAt: '2024-01-15',
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          phone: '(21) 99876-5432',
          cpf: '987.654.321-00',
          birthDate: '1985-08-22',
          isActive: true,
          totalOrders: 8,
          totalSpent: 890.50,
          lastOrderDate: '2025-10-18',
          addresses: [
            {
              id: 2,
              street: 'Av. Paulista',
              number: '1000',
              neighborhood: 'Bela Vista',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01310-100',
              isDefault: true,
            }
          ],
          createdAt: '2024-03-10',
        },
        {
          id: 3,
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          phone: '(11) 97654-3210',
          cpf: '456.789.123-00',
          birthDate: '1995-12-03',
          isActive: true,
          totalOrders: 25,
          totalSpent: 3200.00,
          lastOrderDate: '2025-10-22',
          addresses: [
            {
              id: 3,
              street: 'Rua Oscar Freire',
              number: '500',
              neighborhood: 'Jardins',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01426-001',
              isDefault: true,
            }
          ],
          createdAt: '2023-11-20',
        },
        {
          id: 4,
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          phone: '(19) 98888-7777',
          isActive: true,
          totalOrders: 5,
          totalSpent: 425.90,
          lastOrderDate: '2025-10-15',
          addresses: [],
          createdAt: '2025-02-01',
        },
        {
          id: 5,
          name: 'Carlos Mendes',
          email: 'carlos.mendes@email.com',
          phone: '(11) 96666-5555',
          cpf: '321.654.987-00',
          isActive: false,
          totalOrders: 2,
          totalSpent: 180.00,
          lastOrderDate: '2024-12-10',
          addresses: [],
          createdAt: '2024-10-05',
        },
      ];

      setCustomers(mockCustomers);
      setLoading(false);
    }, 800);
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowEditModal(true);
  };

  const handleSaveEdit = (customer: Customer) => {
    setCustomers(customers.map(c => c.id === customer.id ? customer : c));
    setShowEditModal(false);
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja EXCLUIR o cliente "${name}"?\n\nEsta ação não pode ser desfeita e todos os dados serão removidos permanentemente.`)) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleBan = (id: number, name: string, isBanned: boolean) => {
    const action = isBanned ? 'desbanir' : 'banir';
    if (window.confirm(`Tem certeza que deseja ${action.toUpperCase()} o cliente "${name}"?`)) {
      setCustomers(customers.map(c =>
        c.id === id ? { ...c, isActive: isBanned } : c
      ));
    }
  };

  const handleToggleStatus = (id: number) => {
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, isActive: !customer.isActive }
        : customer
    ));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm) ||
      customer.cpf?.includes(searchTerm);

    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && customer.isActive) ||
      (filterStatus === 'inactive' && !customer.isActive);

    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.isActive).length;
  const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0) || 0;

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h2>👥 Clientes</h2>
          <p className="page-subtitle">Gerencie seus clientes e acompanhe o histórico de compras</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="stats-row">
        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            👥
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{totalCustomers}</div>
            <div className="stat-mini-label">Total de Clientes</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
            ✅
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{activeCustomers}</div>
            <div className="stat-mini-label">Clientes Ativos</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
            💰
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">R$ {totalRevenue.toFixed(2)}</div>
            <div className="stat-mini-label">Faturamento Total</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            📊
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">R$ {avgOrderValue.toFixed(2)}</div>
            <div className="stat-mini-label">Ticket Médio</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-bar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nome, email, telefone ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
      </div>

      {/* Tabela de Clientes */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando clientes...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>Nenhum cliente encontrado</h3>
          <p>Não há clientes cadastrados no momento</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contato</th>
                <th>CPF</th>
                <th className="text-center">Pedidos</th>
                <th className="text-center">Total Gasto</th>
                <th className="text-center">Último Pedido</th>
                <th className="text-center">Status</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-since">
                          Cliente desde {new Date(customer.createdAt || '').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>📧 {customer.email}</div>
                      {customer.phone && <div>📱 {customer.phone}</div>}
                    </div>
                  </td>
                  <td>{customer.cpf || '-'}</td>
                  <td className="text-center">
                    <span className="badge badge-info">{customer.totalOrders || 0}</span>
                  </td>
                  <td className="text-center">
                    <strong className="amount-value">R$ {(customer.totalSpent || 0).toFixed(2)}</strong>
                  </td>
                  <td className="text-center">
                    {customer.lastOrderDate 
                      ? new Date(customer.lastOrderDate).toLocaleDateString('pt-BR')
                      : '-'}
                  </td>
                  <td className="text-center">
                    <button
                      className={`status-badge ${customer.isActive ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleStatus(customer.id!)}
                    >
                      {customer.isActive ? '✓ Ativo' : '✕ Inativo'}
                    </button>
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="btn btn-icon btn-primary"
                        onClick={() => handleViewDetails(customer)}
                        title="Ver Detalhes"
                      >
                        👁️
                      </button>
                      <button
                        className="btn btn-icon btn-outline"
                        onClick={() => handleEdit(customer)}
                        title="Editar Dados"
                      >
                        ✏️
                      </button>
                      <button
                        className={`btn btn-icon ${customer.isActive ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => handleBan(customer.id!, customer.name, !customer.isActive)}
                        title={customer.isActive ? 'Banir Cliente' : 'Desbanir Cliente'}
                      >
                        {customer.isActive ? '�' : '✅'}
                      </button>
                      <button
                        className="btn btn-icon btn-danger"
                        onClick={() => handleDelete(customer.id!, customer.name)}
                        title="Excluir Permanentemente"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Detalhes */}
      {showDetails && selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setShowDetails(false)}
          onEdit={(customer: Customer) => {
            setShowDetails(false);
            handleEdit(customer);
          }}
          onDelete={(id: number, name: string) => {
            setShowDetails(false);
            handleDelete(id, name);
          }}
        />
      )}

      {/* Modal de Edição */}
      {showEditModal && editingCustomer && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Customers;
