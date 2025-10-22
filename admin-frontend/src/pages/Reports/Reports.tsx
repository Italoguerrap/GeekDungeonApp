import React, { useState } from 'react';
import './Reports.css';

const Reports: React.FC = () => {
  const [period, setPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'products' | 'customers' | 'operational'>('overview');

  // Dados simulados mais completos
  const salesData = [
    { date: '01/10', orders: 15, revenue: 1350.00, cost: 810.00, profit: 540.00 },
    { date: '02/10', orders: 23, revenue: 2100.50, cost: 1260.30, profit: 840.20 },
    { date: '03/10', orders: 18, revenue: 1680.00, cost: 1008.00, profit: 672.00 },
    { date: '04/10', orders: 28, revenue: 2540.00, cost: 1524.00, profit: 1016.00 },
    { date: '05/10', orders: 31, revenue: 2890.75, cost: 1734.45, profit: 1156.30 },
    { date: '06/10', orders: 25, revenue: 2200.00, cost: 1320.00, profit: 880.00 },
    { date: '07/10', orders: 35, revenue: 3150.90, cost: 1890.54, profit: 1260.36 },
  ];

  const topProducts = [
    { id: 1, name: 'Camiseta Dragon Ball', category: 'Roupas', sales: 145, revenue: 13025.50, cost: 7815.30, profit: 5210.20, stock: 85, margin: 40 },
    { id: 2, name: 'Moletom Harry Potter', category: 'Roupas', sales: 98, revenue: 14690.20, cost: 8814.12, profit: 5876.08, stock: 42, margin: 40 },
    { id: 3, name: 'Caneca Star Wars', category: 'Acessórios', sales: 234, revenue: 9336.60, cost: 5601.96, profit: 3734.64, stock: 156, margin: 40 },
    { id: 4, name: 'Action Figure Marvel', category: 'Colecionáveis', sales: 67, revenue: 10050.00, cost: 6030.00, profit: 4020.00, stock: 23, margin: 40 },
    { id: 5, name: 'Poster Anime', category: 'Decoração', sales: 156, revenue: 4680.00, cost: 2808.00, profit: 1872.00, stock: 298, margin: 40 },
  ];

  const categoryPerformance = [
    { name: 'Roupas', sales: 243, revenue: 27715.70, percentage: 42.5, growth: 15.2 },
    { name: 'Acessórios', sales: 412, revenue: 16488.80, percentage: 25.3, growth: 8.7 },
    { name: 'Colecionáveis', sales: 134, revenue: 20100.00, percentage: 30.8, growth: -3.2 },
    { name: 'Decoração', sales: 189, revenue: 5670.00, percentage: 8.7, growth: 22.1 },
  ];

  const customerMetrics = {
    total: 1245,
    new: 342,
    active: 876,
    inactive: 369,
    avgLifetimeValue: 1250.50,
    avgPurchaseFrequency: 3.2,
    churnRate: 12.5,
    retentionRate: 87.5,
  };

  const paymentMethods = [
    { method: 'Cartão de Crédito', transactions: 523, amount: 45678.90, percentage: 68.5 },
    { method: 'PIX', transactions: 189, amount: 15234.50, percentage: 22.8 },
    { method: 'Boleto', transactions: 45, amount: 4890.20, percentage: 7.3 },
    { method: 'Cartão de Débito', transactions: 12, amount: 945.60, percentage: 1.4 },
  ];

  const operationalMetrics = {
    pendingOrders: 23,
    processingOrders: 45,
    shippedOrders: 67,
    deliveredOrders: 543,
    canceledOrders: 12,
    returnRate: 2.3,
    avgProcessingTime: '2.5 horas',
    avgDeliveryTime: '5 dias',
    inventoryValue: 125890.50,
    lowStockItems: 34,
    outOfStockItems: 8,
  };

  const financialMetrics = {
    grossRevenue: salesData.reduce((sum, d) => sum + d.revenue, 0),
    totalCosts: salesData.reduce((sum, d) => sum + d.cost, 0),
    netProfit: salesData.reduce((sum, d) => sum + d.profit, 0),
    operatingExpenses: 3500.00,
    shipping: 1250.80,
    taxes: 2890.45,
    marketing: 1500.00,
    refunds: 450.30,
  };

  const totalRevenue = financialMetrics.grossRevenue;
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const profitMargin = ((financialMetrics.netProfit / financialMetrics.grossRevenue) * 100).toFixed(1);

  const tabs = [
    { id: 'overview' as const, label: 'Visão Geral', icon: '📊' },
    { id: 'financial' as const, label: 'Financeiro', icon: '💰' },
    { id: 'products' as const, label: 'Produtos', icon: '📦' },
    { id: 'customers' as const, label: 'Clientes', icon: '👥' },
    { id: 'operational' as const, label: 'Operacional', icon: '⚙️' },
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h2>📊 Relatórios Gerenciais Completos</h2>
          <p className="page-subtitle">Análise completa para gestão administrativa e contábil</p>
        </div>
        <div className="header-actions">
          <select
            className="period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="today">Hoje</option>
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
            <option value="quarter">Último trimestre</option>
            <option value="year">Último ano</option>
            <option value="custom">Período personalizado</option>
          </select>
          <button className="btn btn-primary">📥 Exportar PDF</button>
          <button className="btn btn-outline">📊 Exportar Excel</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="report-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: VISÃO GERAL */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          {/* Cards Principais */}
          <div className="stats-grid-4">
            <div className="stat-card-report highlight">
              <div className="stat-header">
                <span className="stat-icon">💰</span>
                <span className="stat-change positive">+12.5%</span>
              </div>
              <div className="stat-value-large">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className="stat-label">Receita Total</div>
              <div className="stat-detail">Meta: R$ 18.000,00</div>
            </div>

            <div className="stat-card-report">
              <div className="stat-header">
                <span className="stat-icon">📈</span>
                <span className="stat-change positive">+{profitMargin}%</span>
              </div>
              <div className="stat-value-large">R$ {financialMetrics.netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className="stat-label">Lucro Líquido</div>
              <div className="stat-detail">Margem: {profitMargin}%</div>
            </div>

            <div className="stat-card-report">
              <div className="stat-header">
                <span className="stat-icon">🛒</span>
                <span className="stat-change positive">+8.2%</span>
              </div>
              <div className="stat-value-large">{totalOrders}</div>
              <div className="stat-label">Pedidos</div>
              <div className="stat-detail">Taxa conversão: 3.5%</div>
            </div>

            <div className="stat-card-report">
              <div className="stat-header">
                <span className="stat-icon">💳</span>
                <span className="stat-change positive">+5.1%</span>
              </div>
              <div className="stat-value-large">R$ {avgOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className="stat-label">Ticket Médio</div>
              <div className="stat-detail">Vs. anterior: +R$ 5,20</div>
            </div>
          </div>

          {/* Gráfico de Vendas */}
          <div className="report-section">
            <h3 className="section-title">📈 Evolução de Vendas e Lucro</h3>
            <div className="chart-container">
              <div className="chart-legend">
                <span className="legend-item"><span className="legend-color revenue"></span> Receita</span>
                <span className="legend-item"><span className="legend-color profit"></span> Lucro</span>
                <span className="legend-item"><span className="legend-color cost"></span> Custo</span>
              </div>
              <div className="advanced-chart">
                {salesData.map((data, index) => (
                  <div key={index} className="chart-day">
                    <div className="chart-bars">
                      <div
                        className="chart-bar revenue"
                        style={{ height: `${(data.revenue / 3500) * 100}%` }}
                        title={`Receita: R$ ${data.revenue.toFixed(2)}`}
                      />
                      <div
                        className="chart-bar profit"
                        style={{ height: `${(data.profit / 3500) * 100}%` }}
                        title={`Lucro: R$ ${data.profit.toFixed(2)}`}
                      />
                      <div
                        className="chart-bar cost"
                        style={{ height: `${(data.cost / 3500) * 100}%` }}
                        title={`Custo: R$ ${data.cost.toFixed(2)}`}
                      />
                    </div>
                    <div className="chart-date">{data.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance por Categoria */}
          <div className="report-section">
            <h3 className="section-title">📊 Performance por Categoria</h3>
            <div className="category-grid">
              {categoryPerformance.map((cat, index) => (
                <div key={index} className="category-card">
                  <div className="category-header">
                    <h4>{cat.name}</h4>
                    <span className={`growth-badge ${cat.growth >= 0 ? 'positive' : 'negative'}`}>
                      {cat.growth >= 0 ? '↗' : '↘'} {Math.abs(cat.growth)}%
                    </span>
                  </div>
                  <div className="category-stats">
                    <div className="category-stat">
                      <span className="stat-label">Vendas</span>
                      <span className="stat-value">{cat.sales}</span>
                    </div>
                    <div className="category-stat">
                      <span className="stat-label">Receita</span>
                      <span className="stat-value">R$ {cat.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <div className="category-progress-bar">
                    <div className="progress-fill" style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                  <div className="category-percentage">{cat.percentage}% do total</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: FINANCEIRO */}
      {activeTab === 'financial' && (
        <div className="tab-content">
          <div className="financial-overview">
            <div className="financial-card highlight">
              <h3>💰 Demonstrativo de Resultados (DRE)</h3>
              <div className="financial-line">
                <span>Receita Bruta</span>
                <span className="value positive">R$ {financialMetrics.grossRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line">
                <span>(-) Custos dos Produtos</span>
                <span className="value negative">R$ {financialMetrics.totalCosts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line subtotal">
                <span>Lucro Bruto</span>
                <span className="value">R$ {(financialMetrics.grossRevenue - financialMetrics.totalCosts).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line">
                <span>(-) Despesas Operacionais</span>
                <span className="value negative">R$ {financialMetrics.operatingExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line">
                <span>(-) Frete</span>
                <span className="value negative">R$ {financialMetrics.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line">
                <span>(-) Marketing</span>
                <span className="value negative">R$ {financialMetrics.marketing.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line">
                <span>(-) Impostos</span>
                <span className="value negative">R$ {financialMetrics.taxes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line">
                <span>(-) Devoluções</span>
                <span className="value negative">R$ {financialMetrics.refunds.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-line total">
                <span>Lucro Líquido</span>
                <span className="value">R$ {financialMetrics.netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="financial-margin">
                Margem Líquida: <strong>{profitMargin}%</strong>
              </div>
            </div>

            <div className="financial-card">
              <h3>💳 Formas de Pagamento</h3>
              <div className="payment-methods-list">
                {paymentMethods.map((payment, index) => (
                  <div key={index} className="payment-method-item">
                    <div className="payment-info">
                      <div className="payment-name">{payment.method}</div>
                      <div className="payment-details">
                        {payment.transactions} transações
                      </div>
                    </div>
                    <div className="payment-amount">
                      <div className="amount-value">R$ {payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                      <div className="amount-percentage">{payment.percentage}%</div>
                    </div>
                    <div className="payment-progress">
                      <div className="progress-fill" style={{ width: `${payment.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="financial-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">💵</div>
              <div className="metric-value">R$ {(financialMetrics.grossRevenue / totalOrders).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className="metric-label">Ticket Médio Bruto</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">📊</div>
              <div className="metric-value">{profitMargin}%</div>
              <div className="metric-label">Margem de Lucro</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">💰</div>
              <div className="metric-value">R$ {(financialMetrics.netProfit / totalOrders).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className="metric-label">Lucro por Pedido</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">📈</div>
              <div className="metric-value">{((financialMetrics.grossRevenue - financialMetrics.totalCosts) / financialMetrics.grossRevenue * 100).toFixed(1)}%</div>
              <div className="metric-label">Margem Bruta</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PRODUTOS - será implementado na próxima iteração */}
      {activeTab === 'products' && (
        <div className="tab-content">
          <p>Conteúdo de Produtos em desenvolvimento...</p>
        </div>
      )}

      {/* TAB: CLIENTES - será implementado na próxima iteração */}
      {activeTab === 'customers' && (
        <div className="tab-content">
          <p>Conteúdo de Clientes em desenvolvimento...</p>
        </div>
      )}

      {/* TAB: OPERACIONAL - será implementado na próxima iteração */}
      {activeTab === 'operational' && (
        <div className="tab-content">
          <p>Conteúdo Operacional em desenvolvimento...</p>
        </div>
      )}

      {/* Cards de Resumo - ANTIGO (manter por enquanto) */}
      <div className="stats-row" style={{display: 'none'}}>
        <div className="stat-card-report">
          <div className="stat-header">
            <span className="stat-icon">💰</span>
            <span className="stat-change positive">+12%</span>
          </div>
          <div className="stat-value-large">R$ {totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Faturamento Total</div>
        </div>

        <div className="stat-card-report">
          <div className="stat-header">
            <span className="stat-icon">📦</span>
            <span className="stat-change positive">+8%</span>
          </div>
          <div className="stat-value-large">{totalOrders}</div>
          <div className="stat-label">Pedidos Realizados</div>
        </div>

        <div className="stat-card-report">
          <div className="stat-header">
            <span className="stat-icon">📊</span>
            <span className="stat-change positive">+5%</span>
          </div>
          <div className="stat-value-large">R$ {avgOrderValue.toFixed(2)}</div>
          <div className="stat-label">Ticket Médio</div>
        </div>

        <div className="stat-card-report">
          <div className="stat-header">
            <span className="stat-icon">👥</span>
            <span className="stat-change positive">+15%</span>
          </div>
          <div className="stat-value-large">342</div>
          <div className="stat-label">Novos Clientes</div>
        </div>
      </div>

      {/* Gráfico de Vendas (Simplificado) - ANTIGO (oculto) */}
      <div className="report-section" style={{display: 'none'}}>
        <h3 className="section-title">📈 Vendas nos Últimos Dias</h3>
        <div className="chart-container">
          <div className="simple-chart">
            {salesData.map((data, index) => (
              <div key={index} className="chart-bar">
                <div
                  className="bar"
                  style={{ height: `${(data.revenue / 3500) * 100}%` }}
                  title={`R$ ${data.revenue.toFixed(2)}`}
                >
                  <span className="bar-value">{data.orders}</span>
                </div>
                <div className="bar-label">{data.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Produtos - ANTIGO (oculto) */}
      <div className="report-section" style={{display: 'none'}}>
        <h3 className="section-title">🏆 Produtos Mais Vendidos</h3>
        <div className="top-products-list">
          {topProducts.map((product, index) => (
            <div key={index} className="product-rank-item">
              <div className="rank-number">#{index + 1}</div>
              <div className="product-rank-info">
                <div className="product-rank-name">{product.name}</div>
                <div className="product-rank-stats">
                  {product.sales} vendas • R$ {product.revenue.toFixed(2)}
                </div>
              </div>
              <div className="product-rank-bar">
                <div
                  className="rank-progress"
                  style={{ width: `${(product.revenue / 15000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ações Rápidas - ANTIGO (oculto) */}
      <div className="report-actions" style={{display: 'none'}}>
        <button className="btn btn-primary">📥 Exportar Relatório (PDF)</button>
        <button className="btn btn-outline">📊 Exportar Dados (Excel)</button>
      </div>
    </div>
  );
};

export default Reports;
