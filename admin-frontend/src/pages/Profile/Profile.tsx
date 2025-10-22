import React, { useState } from 'react';
import './Profile.css';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Administrador',
    email: 'admin@geekdungeon.com',
    phone: '(11) 99999-9999',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulação de salvamento
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage('✅ Perfil atualizado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const handleChangePassword = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      alert('❌ As senhas não coincidem!');
      return;
    }

    if (profile.newPassword.length < 6) {
      alert('❌ A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setIsSaving(true);
    
    // Simulação de mudança de senha
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage('✅ Senha alterada com sucesso!');
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'info' as const, label: 'Informações Pessoais', icon: '👤' },
    { id: 'security' as const, label: 'Segurança', icon: '🔒' },
  ];

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">👤 Meu Perfil</h1>
          <p className="page-description">Gerencie suas informações pessoais e configurações de conta</p>
        </div>
      </div>

      {successMessage && (
        <div className="success-banner">
          {successMessage}
        </div>
      )}

      <div className="profile-container">
        {/* Sidebar com Avatar */}
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">👤</div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
            <button className="btn-change-avatar">
              📷 Alterar Foto
            </button>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-label">Membro desde</span>
              <span className="stat-value">Janeiro 2024</span>
            </div>
            <div className="profile-stat">
              <span className="stat-label">Último acesso</span>
              <span className="stat-value">Hoje, 14:30</span>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="profile-content">
          {/* Tabs */}
          <div className="profile-tabs">
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

          {/* Tab: Informações Pessoais */}
          {activeTab === 'info' && (
            <div className="tab-content">
              <div className="form-section">
                <h3 className="section-title">Informações Básicas</h3>
                
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-input"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? '💾 Salvando...' : '💾 Salvar Alterações'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Segurança */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <div className="form-section">
                <h3 className="section-title">Alterar Senha</h3>
                <p className="section-description">
                  Por segurança, recomendamos que você altere sua senha regularmente.
                </p>
                
                <div className="form-group">
                  <label className="form-label">Senha Atual</label>
                  <input
                    type="password"
                    className="form-input"
                    value={profile.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nova Senha</label>
                  <input
                    type="password"
                    className="form-input"
                    value={profile.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Digite sua nova senha"
                  />
                  <span className="form-hint">Mínimo de 6 caracteres</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    className="form-input"
                    value={profile.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirme sua nova senha"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                    onClick={handleChangePassword}
                    disabled={isSaving}
                  >
                    {isSaving ? '🔒 Alterando...' : '🔒 Alterar Senha'}
                  </button>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Autenticação em Dois Fatores</h3>
                <p className="section-description">
                  Adicione uma camada extra de segurança à sua conta.
                </p>
                
                <div className="security-option">
                  <div className="security-option-info">
                    <div className="security-option-icon">📱</div>
                    <div>
                      <h4>Autenticação por SMS</h4>
                      <p>Receba códigos de verificação via SMS</p>
                    </div>
                  </div>
                  <button className="btn btn-outline">Ativar</button>
                </div>

                <div className="security-option">
                  <div className="security-option-info">
                    <div className="security-option-icon">🔐</div>
                    <div>
                      <h4>Aplicativo Autenticador</h4>
                      <p>Use Google Authenticator ou similar</p>
                    </div>
                  </div>
                  <button className="btn btn-outline">Configurar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
