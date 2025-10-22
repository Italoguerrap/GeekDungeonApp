import React, { useState, useEffect } from 'react';
import { StoreSettings } from '../../types';
import './Settings.css';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: 'Geek Dungeon',
    storeDescription: 'Sua loja geek com os melhores produtos de cultura pop',
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#6c63ff',
    secondaryColor: '#5a52d5',
    accentColor: '#ff6584',
    email: 'contato@geekdungeon.com',
    phone: '(11) 99999-9999',
    whatsapp: '11999999999',
    address: 'São Paulo, SP',
    instagram: '@geekdungeon',
    facebook: 'geekdungeon',
    twitter: '@geekdungeon',
    pixKey: 'contato@geekdungeon.com',
    currency: 'BRL',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    maintenanceMode: false,
    allowGuestCheckout: true,
    termsOfServiceUrl: '',
    privacyPolicyUrl: '',
    shippingMessage: 'Frete grátis para compras acima de R$ 200',
    headerMessage: '🎮 Bem-vindo ao Geek Dungeon!',
    footerMessage: '© 2025 Geek Dungeon. Todos os direitos reservados.',
  });

  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'contact' | 'social' | 'advanced'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleColorChange = (name: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulação de salvamento (substituir por chamada API real)
    setTimeout(() => {
      console.log('Configurações salvas:', settings);
      setIsSaving(false);
      setSuccessMessage('✅ Configurações salvas com sucesso!');
      
      // Atualizar o título da página
      document.title = `Admin - ${settings.storeName}`;
      
      // Atualizar as cores CSS
      document.documentElement.style.setProperty('--primary', settings.primaryColor);
      document.documentElement.style.setProperty('--secondary', settings.secondaryColor);
      if (settings.accentColor) {
        document.documentElement.style.setProperty('--accent', settings.accentColor);
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general' as const, label: 'Geral', icon: '🏪' },
    { id: 'appearance' as const, label: 'Aparência', icon: '🎨' },
    { id: 'contact' as const, label: 'Contato', icon: '📞' },
    { id: 'social' as const, label: 'Redes Sociais', icon: '📱' },
    { id: 'advanced' as const, label: 'Avançado', icon: '⚙️' },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">⚙️ Configurações da Loja</h1>
          <p className="page-description">Personalize as configurações da sua loja</p>
        </div>
        <button 
          className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? '💾 Salvando...' : '💾 Salvar Alterações'}
        </button>
      </div>

      {successMessage && (
        <div className="success-banner">
          {successMessage}
        </div>
      )}

      <div className="settings-container">
        <div className="settings-tabs">
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

        <div className="settings-content">
          {/* Aba Geral */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2 className="section-title">Informações Gerais</h2>
              
              <div className="form-group">
                <label htmlFor="storeName">Nome da Loja *</label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  placeholder="Ex: Geek Dungeon"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="storeDescription">Descrição da Loja</label>
                <textarea
                  id="storeDescription"
                  name="storeDescription"
                  value={settings.storeDescription}
                  onChange={handleChange}
                  placeholder="Descreva sua loja em poucas palavras"
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="currency">Moeda</label>
                  <input
                    type="text"
                    id="currency"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    placeholder="BRL"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="language">Idioma</label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    placeholder="pt-BR"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="timezone">Fuso Horário</label>
                  <input
                    type="text"
                    id="timezone"
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                    placeholder="America/Sao_Paulo"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="headerMessage">Mensagem do Cabeçalho</label>
                <input
                  type="text"
                  id="headerMessage"
                  name="headerMessage"
                  value={settings.headerMessage}
                  onChange={handleChange}
                  placeholder="Mensagem de boas-vindas"
                />
              </div>

              <div className="form-group">
                <label htmlFor="shippingMessage">Mensagem de Frete</label>
                <input
                  type="text"
                  id="shippingMessage"
                  name="shippingMessage"
                  value={settings.shippingMessage}
                  onChange={handleChange}
                  placeholder="Ex: Frete grátis acima de R$ 200"
                />
              </div>
            </div>
          )}

          {/* Aba Aparência */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2 className="section-title">Personalização Visual</h2>
              
              <div className="form-group">
                <label htmlFor="logoUrl">URL do Logo</label>
                <input
                  type="text"
                  id="logoUrl"
                  name="logoUrl"
                  value={settings.logoUrl}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/logo.png"
                />
                <small>Recomendado: PNG transparente, 200x60px</small>
              </div>

              <div className="form-group">
                <label htmlFor="faviconUrl">URL do Favicon</label>
                <input
                  type="text"
                  id="faviconUrl"
                  name="faviconUrl"
                  value={settings.faviconUrl}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/favicon.ico"
                />
                <small>Recomendado: ICO ou PNG, 32x32px</small>
              </div>

              <div className="color-picker-group">
                <h3>Esquema de Cores</h3>
                
                <div className="color-picker-row">
                  <div className="color-picker">
                    <label htmlFor="primaryColor">Cor Primária</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        id="primaryColor"
                        value={settings.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={settings.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        placeholder="#6c63ff"
                      />
                    </div>
                  </div>

                  <div className="color-picker">
                    <label htmlFor="secondaryColor">Cor Secundária</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={settings.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={settings.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        placeholder="#5a52d5"
                      />
                    </div>
                  </div>

                  <div className="color-picker">
                    <label htmlFor="accentColor">Cor de Destaque</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        id="accentColor"
                        value={settings.accentColor || '#ff6584'}
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                        placeholder="#ff6584"
                      />
                    </div>
                  </div>
                </div>

                <div className="color-preview">
                  <h4>Pré-visualização</h4>
                  <div className="preview-buttons">
                    <button 
                      className="preview-btn"
                      style={{ 
                        background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                        color: 'white'
                      }}
                    >
                      Botão Primário
                    </button>
                    <button 
                      className="preview-btn"
                      style={{ 
                        background: settings.accentColor,
                        color: 'white'
                      }}
                    >
                      Botão Destaque
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Contato */}
          {activeTab === 'contact' && (
            <div className="settings-section">
              <h2 className="section-title">Informações de Contato</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    placeholder="contato@loja.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={settings.whatsapp}
                  onChange={handleChange}
                  placeholder="11999999999"
                />
                <small>Apenas números, sem espaços ou caracteres especiais</small>
              </div>

              <div className="form-group">
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  placeholder="Rua, Número - Cidade, Estado"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pixKey">Chave PIX</label>
                <input
                  type="text"
                  id="pixKey"
                  name="pixKey"
                  value={settings.pixKey}
                  onChange={handleChange}
                  placeholder="CPF, CNPJ, E-mail ou Chave Aleatória"
                />
              </div>
            </div>
          )}

          {/* Aba Redes Sociais */}
          {activeTab === 'social' && (
            <div className="settings-section">
              <h2 className="section-title">Redes Sociais</h2>
              
              <div className="form-group">
                <label htmlFor="instagram">Instagram</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">@</span>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={settings.instagram?.replace('@', '')}
                    onChange={(e) => setSettings(prev => ({ ...prev, instagram: '@' + e.target.value.replace('@', '') }))}
                    placeholder="geekdungeon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="facebook">Facebook</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">facebook.com/</span>
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={settings.facebook}
                    onChange={handleChange}
                    placeholder="geekdungeon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="twitter">Twitter / X</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">@</span>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={settings.twitter?.replace('@', '')}
                    onChange={(e) => setSettings(prev => ({ ...prev, twitter: '@' + e.target.value.replace('@', '') }))}
                    placeholder="geekdungeon"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Aba Avançado */}
          {activeTab === 'advanced' && (
            <div className="settings-section">
              <h2 className="section-title">Configurações Avançadas</h2>
              
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Modo Manutenção</h4>
                    <p>Quando ativado, apenas administradores podem acessar a loja</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Permitir Compra como Visitante</h4>
                    <p>Permitir que clientes finalizem compras sem criar uma conta</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      name="allowGuestCheckout"
                      checked={settings.allowGuestCheckout}
                      onChange={handleChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="termsOfServiceUrl">URL dos Termos de Serviço</label>
                <input
                  type="text"
                  id="termsOfServiceUrl"
                  name="termsOfServiceUrl"
                  value={settings.termsOfServiceUrl}
                  onChange={handleChange}
                  placeholder="https://seusite.com/termos"
                />
              </div>

              <div className="form-group">
                <label htmlFor="privacyPolicyUrl">URL da Política de Privacidade</label>
                <input
                  type="text"
                  id="privacyPolicyUrl"
                  name="privacyPolicyUrl"
                  value={settings.privacyPolicyUrl}
                  onChange={handleChange}
                  placeholder="https://seusite.com/privacidade"
                />
              </div>

              <div className="form-group">
                <label htmlFor="footerMessage">Mensagem do Rodapé</label>
                <textarea
                  id="footerMessage"
                  name="footerMessage"
                  value={settings.footerMessage}
                  onChange={handleChange}
                  placeholder="© 2025 Sua Loja. Todos os direitos reservados."
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
