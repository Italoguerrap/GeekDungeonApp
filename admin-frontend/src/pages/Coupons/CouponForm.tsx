import React, { useState, useEffect } from 'react';
import { Coupon, CouponType } from '../../types';
import './Coupons.css';

interface CouponFormProps {
  coupon: Coupon | null;
  onSave: (coupon: Coupon) => void;
  onCancel: () => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ coupon, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Coupon>({
    code: '',
    description: '',
    type: CouponType.Percentage,
    value: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (coupon) {
      setFormData(coupon);
    }
  }, [coupon]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Código é obrigatório';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Código deve ter no mínimo 3 caracteres';
    }

    if (formData.value <= 0) {
      newErrors.value = 'Valor deve ser maior que zero';
    }

    if (formData.type === CouponType.Percentage && formData.value > 100) {
      newErrors.value = 'Porcentagem não pode ser maior que 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let finalValue: any = value;

    if (type === 'checkbox') {
      finalValue = checked;
    } else if (type === 'number') {
      finalValue = parseFloat(value) || 0;
    }

    setFormData({
      ...formData,
      [name]: finalValue,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {coupon ? '✏️ Editar Cupom' : '➕ Novo Cupom'}
          </h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Código do Cupom *</label>
              <input
                type="text"
                name="code"
                className={`form-control ${errors.code ? 'error' : ''}`}
                placeholder="Ex: BLACKFRIDAY"
                value={formData.code}
                onChange={handleChange}
                autoFocus
                style={{ textTransform: 'uppercase' }}
              />
              {errors.code && <div className="error-message">{errors.code}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Desconto *</label>
              <select
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
              >
                <option value={CouponType.Percentage}>Porcentagem (%)</option>
                <option value={CouponType.Fixed}>Valor Fixo (R$)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Descreva a promoção..."
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Valor do Desconto * {formData.type === CouponType.Percentage ? '(%)' : '(R$)'}
              </label>
              <input
                type="number"
                name="value"
                className={`form-control ${errors.value ? 'error' : ''}`}
                placeholder="0"
                value={formData.value}
                onChange={handleChange}
                step="0.01"
                min="0"
                max={formData.type === CouponType.Percentage ? '100' : undefined}
              />
              {errors.value && <div className="error-message">{errors.value}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Compra Mínima (R$)</label>
              <input
                type="number"
                name="minPurchase"
                className="form-control"
                placeholder="0.00"
                value={formData.minPurchase || ''}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Desconto Máximo (R$)</label>
              <input
                type="number"
                name="maxDiscount"
                className="form-control"
                placeholder="0.00"
                value={formData.maxDiscount || ''}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Limite de Usos</label>
              <input
                type="number"
                name="usageLimit"
                className="form-control"
                placeholder="Ilimitado"
                value={formData.usageLimit || ''}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Válido de</label>
              <input
                type="date"
                name="validFrom"
                className="form-control"
                value={formData.validFrom || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Válido até</label>
              <input
                type="date"
                name="validUntil"
                className="form-control"
                value={formData.validUntil || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Cupom ativo</span>
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {coupon ? '💾 Salvar Alterações' : '➕ Criar Cupom'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
