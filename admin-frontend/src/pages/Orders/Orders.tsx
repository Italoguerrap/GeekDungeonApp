import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../../types';
import OrderDetails from './OrderDetails';
import './Orders.css';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: 101,
          customerId: 1,
          customer: { id: 1, name: 'João Silva', email: 'joao@email.com' },
          items: [
            { productId: 1, quantity: 2, price: 89.90, size: 'M', product: { id: 1, name: 'Camiseta Dragon Ball', price: 89.90 } as any },
            { productId: 2, quantity: 1, price: 149.90, size: 'G', product: { id: 2, name: 'Moletom Harry Potter', price: 149.90 } as any },
          ],
          subtotal: 329.70,
          shipping: 15.00,
          total: 344.70,
          status: OrderStatus.Delivered,
          paymentMethod: 'Cartão de Crédito',
          trackingCode: 'BR123456789',
          createdAt: '2025-10-20T10:30:00',
        },
        {
          id: 102,
          customerId: 2,
          customer: { id: 2, name: 'Maria Santos', email: 'maria@email.com' },
          items: [
            { productId: 3, quantity: 3, price: 39.90, product: { id: 3, name: 'Caneca Star Wars', price: 39.90 } as any },
          ],
          subtotal: 119.70,
          shipping: 12.00,
          total: 131.70,
          status: OrderStatus.Shipped,
          paymentMethod: 'PIX',
          trackingCode: 'BR987654321',
          createdAt: '2025-10-21T14:20:00',
        },
        {
          id: 103,
          customerId: 3,
          customer: { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com' },
          items: [
            { productId: 1, quantity: 1, price: 89.90, size: 'G', product: { id: 1, name: 'Camiseta Dragon Ball', price: 89.90 } as any },
          ],
          subtotal: 89.90,
          shipping: 10.00,
          total: 99.90,
          status: OrderStatus.Processing,
          paymentMethod: 'Boleto',
          createdAt: '2025-10-22T09:15:00',
        },
        {
          id: 104,
          customerId: 1,
          customer: { id: 1, name: 'João Silva', email: 'joao@email.com' },
          items: [
            { productId: 2, quantity: 1, price: 149.90, size: 'M', product: { id: 2, name: 'Moletom Harry Potter', price: 149.90 } as any },
          ],
          subtotal: 149.90,
          shipping: 15.00,
          total: 164.90,
          status: OrderStatus.Paid,
          paymentMethod: 'Cartão de Crédito',
          createdAt: '2025-10-22T11:45:00',
        },
        {
          id: 105,
          customerId: 5,
          customer: { id: 5, name: 'Carlos Mendes', email: 'carlos@email.com' },
          items: [
            { productId: 1, quantity: 2, price: 89.90, size: 'P', product: { id: 1, name: 'Camiseta Dragon Ball', price: 89.90 } as any },
          ],
          subtotal: 179.80,
          discount: 20.00,
          shipping: 12.00,
          total: 171.80,
          status: OrderStatus.Cancelled,
          paymentMethod: 'PIX',
          createdAt: '2025-10-18T16:00:00',
        },
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 800);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id?.toString().includes(searchTerm) ||
      order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingCode?.includes(searchTerm);

    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
      [OrderStatus.Pending]: { label: '⏳ Pendente', className: 'pending' },
      [OrderStatus.Paid]: { label: '✅ Pago', className: 'paid' },
      [OrderStatus.Processing]: { label: '📦 Processando', className: 'processing' },
      [OrderStatus.Shipped]: { label: '🚚 Enviado', className: 'shipped' },
      [OrderStatus.Delivered]: { label: '✓ Entregue', className: 'delivered' },
      [OrderStatus.Cancelled]: { label: '✕ Cancelado', className: 'cancelled' },
    };

    const config = statusConfig[status];
    return <span className={`order-status ${config.className}`}>{config.label}</span>;
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === OrderStatus.Pending || o.status === OrderStatus.Paid).length;
  const avgOrderValue = totalRevenue / totalOrders || 0;

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h2>📦 Pedidos</h2>
          <p className="page-subtitle">Gerencie todos os pedidos da sua loja</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="stats-row">
        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            📦
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{totalOrders}</div>
            <div className="stat-mini-label">Total de Pedidos</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            💰
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">R$ {totalRevenue.toFixed(2)}</div>
            <div className="stat-mini-label">Faturamento Total</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)' }}>
            ⏳
          </div>
          <div className="stat-mini-info">
            <div className="stat-mini-value">{pendingOrders}</div>
            <div className="stat-mini-label">Pedidos Pendentes</div>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
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
            placeholder="Buscar por pedido, cliente ou código de rastreio..."
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
          <option value={OrderStatus.Pending}>Pendente</option>
          <option value={OrderStatus.Paid}>Pago</option>
          <option value={OrderStatus.Processing}>Processando</option>
          <option value={OrderStatus.Shipped}>Enviado</option>
          <option value={OrderStatus.Delivered}>Entregue</option>
          <option value={OrderStatus.Cancelled}>Cancelado</option>
        </select>
      </div>

      {/* Tabela de Pedidos */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando pedidos...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>Nenhum pedido encontrado</h3>
          <p>Não há pedidos no momento</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Data</th>
                <th className="text-center">Itens</th>
                <th className="text-center">Total</th>
                <th className="text-center">Pagamento</th>
                <th className="text-center">Status</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="order-id">#{order.id}</div>
                    {order.trackingCode && (
                      <div className="tracking-code">🚚 {order.trackingCode}</div>
                    )}
                  </td>
                  <td>
                    <div className="customer-info-mini">
                      <div className="customer-name">{order.customer?.name}</div>
                      <div className="customer-email">{order.customer?.email}</div>
                    </div>
                  </td>
                  <td>
                    {new Date(order.createdAt || '').toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="text-center">
                    <span className="badge badge-info">{order.items.length}</span>
                  </td>
                  <td className="text-center">
                    <strong className="amount-value">R$ {order.total.toFixed(2)}</strong>
                  </td>
                  <td className="text-center">
                    <div className="payment-method">{order.paymentMethod}</div>
                  </td>
                  <td className="text-center">
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id!, e.target.value as OrderStatus)}
                    >
                      <option value={OrderStatus.Pending}>⏳ Pendente</option>
                      <option value={OrderStatus.Paid}>✅ Pago</option>
                      <option value={OrderStatus.Processing}>📦 Processando</option>
                      <option value={OrderStatus.Shipped}>🚚 Enviado</option>
                      <option value={OrderStatus.Delivered}>✓ Entregue</option>
                      <option value={OrderStatus.Cancelled}>✕ Cancelado</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleViewDetails(order)}
                    >
                      👁️ Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Detalhes */}
      {showDetails && selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setShowDetails(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Orders;
