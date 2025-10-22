import React from 'react';
import { Order, OrderStatus } from '../../types';
import './Orders.css';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose, onStatusChange }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large order-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">📦 Detalhes do Pedido #{order.id}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="order-details-content">
          {/* Status e Ações */}
          <div className="details-section">
            <div className="order-header-row">
              <div>
                <h2>Pedido #{order.id}</h2>
                <p className="order-date">
                  {new Date(order.createdAt || '').toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="order-actions-header">
                <select
                  className="status-select-large"
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id!, e.target.value as OrderStatus)}
                >
                  <option value={OrderStatus.Pending}>⏳ Pendente</option>
                  <option value={OrderStatus.Paid}>✅ Pago</option>
                  <option value={OrderStatus.Processing}>📦 Processando</option>
                  <option value={OrderStatus.Shipped}>🚚 Enviado</option>
                  <option value={OrderStatus.Delivered}>✓ Entregue</option>
                  <option value={OrderStatus.Cancelled}>✕ Cancelado</option>
                </select>
                <button className="btn btn-outline" onClick={handlePrint}>
                  🖨️ Imprimir
                </button>
              </div>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className="details-section">
            <h3 className="section-title">👤 Informações do Cliente</h3>
            <div className="customer-info-detailed">
              <div className="customer-avatar-large">
                {order.customer?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4>{order.customer?.name}</h4>
                <p>📧 {order.customer?.email}</p>
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          {order.shippingAddress && (
            <div className="details-section">
              <h3 className="section-title">📍 Endereço de Entrega</h3>
              <div className="address-card">
                <p>
                  <strong>{order.shippingAddress.street}, {order.shippingAddress.number}</strong>
                  {order.shippingAddress.complement && <span> - {order.shippingAddress.complement}</span>}
                </p>
                <p>{order.shippingAddress.neighborhood} - {order.shippingAddress.city}/{order.shippingAddress.state}</p>
                <p>CEP: {order.shippingAddress.zipCode}</p>
              </div>
              {order.trackingCode && (
                <div className="tracking-info">
                  <strong>Código de Rastreamento:</strong>
                  <span className="tracking-code-large">{order.trackingCode}</span>
                </div>
              )}
            </div>
          )}

          {/* Produtos do Pedido */}
          <div className="details-section">
            <h3 className="section-title">🛍️ Produtos</h3>
            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-card">
                  <div className="item-info">
                    <h4>{item.product?.name}</h4>
                    {item.size && <span className="item-detail">Tamanho: {item.size}</span>}
                    {item.color && <span className="item-detail">Cor: {item.color}</span>}
                  </div>
                  <div className="item-quantity">
                    Qtd: {item.quantity}
                  </div>
                  <div className="item-price">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo Financeiro */}
          <div className="details-section">
            <h3 className="section-title">💰 Resumo Financeiro</h3>
            <div className="financial-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>R$ {order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount && order.discount > 0 && (
                <div className="summary-row discount">
                  <span>Desconto:</span>
                  <span>- R$ {order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Frete:</span>
                <span>R$ {order.shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span><strong>Total:</strong></span>
                <span><strong>R$ {order.total.toFixed(2)}</strong></span>
              </div>
              <div className="payment-method-info">
                <span>Forma de Pagamento:</span>
                <span><strong>{order.paymentMethod}</strong></span>
              </div>
            </div>
          </div>

          {/* Observações */}
          {order.notes && (
            <div className="details-section">
              <h3 className="section-title">📝 Observações</h3>
              <p className="order-notes">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
