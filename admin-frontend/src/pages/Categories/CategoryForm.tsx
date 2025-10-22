import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import './CategoryForm.css';

interface CategoryFormProps {
  category: Category | null;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Category>({
    name: '',
    description: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Limpar erro do campo
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {category ? '✏️ Editar Categoria' : '➕ Nova Categoria'}
          </h3>
          <button className="modal-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Nome da Categoria *
            </label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Ex: Camisetas, Moletons, Canecas..."
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Descrição
            </label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Descreva esta categoria..."
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Categoria ativa</span>
            </label>
            <small className="form-help">Categorias inativas não aparecem no site</small>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {category ? '💾 Salvar Alterações' : '➕ Criar Categoria'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
