import React, { useState, useEffect } from 'react';
import { Banner } from '../../types';
import './Banners.css';

interface BannerFormProps {
  banner: Banner | null;
  onSave: (banner: Banner) => void;
  onCancel: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ banner, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Banner>({
    title: '',
    imageUrl: '',
    order: 1,
    isActive: true,
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (banner) {
      setFormData(banner);
      setImagePreview(banner.imageUrl);
    }
  }, [banner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{banner ? '✏️ Editar Banner' : '➕ Novo Banner'}</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Título *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imagem do Banner *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
            />
            {imagePreview && (
              <div className="image-preview-banner">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Link (URL)</label>
              <input
                type="text"
                name="link"
                className="form-control"
                value={formData.link || ''}
                onChange={handleChange}
                placeholder="/produtos/promocao"
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
              <span>Banner ativo</span>
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {banner ? '💾 Salvar' : '➕ Criar Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;
