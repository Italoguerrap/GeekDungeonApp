import React, { useState, useEffect } from 'react';
import { Product, Category, ProductSize } from '../../types';
import './ProductForm.css';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const AVAILABLE_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG', '2XG', '3XG'];

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    stock: 0,
    sku: '',
    isActive: true,
    isFeatured: false,
    sizes: [],
    colors: [],
    images: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData(product);
      if (product.images) {
        setImagePreview(product.images.map(img => img.url));
      }
    }
  }, [product]);

  // Calcular estoque total
  const calculateTotalStock = (sizes: ProductSize[]): number => {
    return sizes.reduce((total, size) => total + size.stock, 0);
  };

  // Adicionar/Remover tamanho
  const toggleSize = (size: string) => {
    const currentSizes = formData.sizes || [];
    const existingSize = currentSizes.find(s => s.size === size);

    let newSizes: ProductSize[];
    if (existingSize) {
      newSizes = currentSizes.filter(s => s.size !== size);
    } else {
      newSizes = [...currentSizes, { size, stock: 0 }];
    }

    setFormData({
      ...formData,
      sizes: newSizes,
      stock: calculateTotalStock(newSizes),
    });
  };

  // Atualizar quantidade de um tamanho
  const updateSizeStock = (size: string, stock: number) => {
    const currentSizes = formData.sizes || [];
    const newSizes = currentSizes.map(s =>
      s.size === size ? { ...s, stock: Math.max(0, stock) } : s
    );

    setFormData({
      ...formData,
      sizes: newSizes,
      stock: calculateTotalStock(newSizes),
    });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      newErrors.categoryId = 'Selecione uma categoria';
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      const newImages: any[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          newImages.push({ url: reader.result as string, isPrimary: imagePreview.length === 0 });
          
          if (newPreviews.length === files.length) {
            setImagePreview([...imagePreview, ...newPreviews]);
            setFormData({
              ...formData,
              images: [...(formData.images || []), ...newImages],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    const newImages = formData.images?.filter((_, i) => i !== index);
    setImagePreview(newPreviews);
    setFormData({ ...formData, images: newImages });
  };

  const handleArrayInput = (field: 'colors', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData({ ...formData, [field]: items });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {product ? '✏️ Editar Produto' : '➕ Novo Produto'}
          </h3>
          <button className="modal-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Nome do Produto *
              </label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'error' : ''}`}
                placeholder="Ex: Camiseta Dragon Ball"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                SKU (Código)
              </label>
              <input
                type="text"
                name="sku"
                className="form-control"
                placeholder="Ex: CMST-DBZ-001"
                value={formData.sku || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Descrição *
            </label>
            <textarea
              name="description"
              className={`form-control ${errors.description ? 'error' : ''}`}
              placeholder="Descreva o produto em detalhes..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Categoria *
              </label>
              <select
                name="categoryId"
                className={`form-control ${errors.categoryId ? 'error' : ''}`}
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="0">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.categoryId && <div className="error-message">{errors.categoryId}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Preço (R$) *
              </label>
              <input
                type="number"
                name="price"
                className={`form-control ${errors.price ? 'error' : ''}`}
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
              {errors.price && <div className="error-message">{errors.price}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Estoque Total
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="0"
                value={formData.stock || 0}
                readOnly
                disabled
                style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
              />
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                Calculado automaticamente pelos tamanhos
              </small>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Tamanhos Disponíveis e Estoque
            </label>
            <div className="sizes-grid">
              {AVAILABLE_SIZES.map(size => {
                const sizeData = formData.sizes?.find(s => s.size === size);
                const isSelected = !!sizeData;

                return (
                  <div key={size} className="size-item">
                    <label className="size-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSize(size)}
                      />
                      <span className="size-label">{size}</span>
                    </label>
                    {isSelected && (
                      <input
                        type="number"
                        className="size-stock-input"
                        placeholder="Qtd"
                        value={sizeData?.stock || 0}
                        onChange={(e) => updateSizeStock(size, parseInt(e.target.value) || 0)}
                        min="0"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Cores (separadas por vírgula)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Preto, Branco, Azul"
              value={formData.colors?.join(', ') || ''}
              onChange={(e) => handleArrayInput('colors', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Imagens do Produto
            </label>
            <div className="image-upload-area">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                id="image-upload"
                className="image-input"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <span className="upload-icon">📷</span>
                <span>Clique para adicionar imagens</span>
                <span className="upload-hint">ou arraste e solte aqui</span>
              </label>
            </div>

            {imagePreview.length > 0 && (
              <div className="image-preview-grid">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                    {index === 0 && <div className="primary-badge">Principal</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-row checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <span>Produto ativo</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <span>⭐ Produto em destaque</span>
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {product ? '💾 Salvar Alterações' : '➕ Criar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
