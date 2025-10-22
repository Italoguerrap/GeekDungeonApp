import React, { useState, FormEvent } from 'react';
import { Customer, Address } from '../../types';
import './CustomerForm.css';

interface CustomerFormProps {
  customer: Customer;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Customer>({
    ...customer,
    addresses: customer.addresses || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (index: number, field: keyof Address, value: string) => {
    const addresses = formData.addresses || [];
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleAddAddress = () => {
    const addresses = formData.addresses || [];
    const newAddress: Address = {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: addresses.length === 0
    };
    setFormData(prev => ({
      ...prev,
      addresses: [...addresses, newAddress]
    }));
  };

  const handleRemoveAddress = (index: number) => {
    const addresses = formData.addresses || [];
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    // Se removeu o endereço padrão e ainda tem endereços, define o primeiro como padrão
    if (addresses[index]?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleSetDefaultAddress = (index: number) => {
    const addresses = formData.addresses || [];
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    setFormData(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content customer-form-modal">
        <div className="modal-header">
          <h2>✏️ Editar Cliente</h2>
          <button className="btn-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h3>Dados Pessoais</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h3>Endereços ({(formData.addresses || []).length})</h3>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleAddAddress}
                >
                  + Adicionar Endereço
                </button>
              </div>

              {(formData.addresses || []).map((address, index) => (
                <div key={index} className="address-card">
                  <div className="address-card-header">
                    <div className="address-title">
                      <span>Endereço #{index + 1}</span>
                      {address.isDefault && <span className="badge badge-primary">Padrão</span>}
                    </div>
                    <div className="address-actions">
                      {!address.isDefault && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={() => handleSetDefaultAddress(index)}
                        >
                          Definir como Padrão
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveAddress(index)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        value={address.zipCode}
                        onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-3">
                      <label>Rua</label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                      />
                    </div>

                    <div className="form-group flex-1">
                      <label>Número</label>
                      <input
                        type="text"
                        value={address.number}
                        onChange={(e) => handleAddressChange(index, 'number', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Complemento</label>
                      <input
                        type="text"
                        value={address.complement || ''}
                        onChange={(e) => handleAddressChange(index, 'complement', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Bairro</label>
                      <input
                        type="text"
                        value={address.neighborhood}
                        onChange={(e) => handleAddressChange(index, 'neighborhood', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Estado</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {(!formData.addresses || formData.addresses.length === 0) && (
                <div className="empty-state">
                  <p>Nenhum endereço cadastrado</p>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
