import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import ProductForm from './ProductForm';
import './Products.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Mock data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Camisetas', isActive: true },
        { id: 2, name: 'Moletons', isActive: true },
        { id: 3, name: 'Canecas', isActive: true },
      ];

      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Camiseta Dragon Ball',
          description: 'Camiseta 100% algodão com estampa do Goku',
          price: 89.90,
          categoryId: 1,
          category: mockCategories[0],
          stock: 50,
          sku: 'CMST-DBZ-001',
          isActive: true,
          isFeatured: true,
          sizes: [
            { size: 'P', stock: 10 },
            { size: 'M', stock: 15 },
            { size: 'G', stock: 15 },
            { size: 'GG', stock: 10 },
          ],
          colors: ['Preto', 'Branco'],
          images: [{url: 'https://via.placeholder.com/300', isPrimary: true}],
          createdAt: '2025-01-15',
        },
        {
          id: 2,
          name: 'Moletom Harry Potter',
          description: 'Moletom canguru com capuz',
          price: 149.90,
          categoryId: 2,
          category: mockCategories[1],
          stock: 30,
          sku: 'MLT-HP-001',
          isActive: true,
          isFeatured: false,
          sizes: [
            { size: 'M', stock: 10 },
            { size: 'G', stock: 12 },
            { size: 'GG', stock: 8 },
          ],
          colors: ['Preto', 'Azul Marinho'],
          images: [{url: 'https://via.placeholder.com/300', isPrimary: true}],
          createdAt: '2025-01-16',
        },
        {
          id: 3,
          name: 'Caneca Star Wars',
          description: 'Caneca de cerâmica 325ml',
          price: 39.90,
          categoryId: 3,
          category: mockCategories[2],
          stock: 100,
          sku: 'CNC-SW-001',
          isActive: true,
          isFeatured: true,
          sizes: [],
          colors: ['Branco'],
          images: [{url: 'https://via.placeholder.com/300', isPrimary: true}],
          createdAt: '2025-01-17',
        },
      ];

      setCategories(mockCategories);
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(prod => prod.id !== id));
      alert('Produto excluído com sucesso!');
    }
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map(prod => 
        prod.id === editingProduct.id ? { ...product, id: prod.id } : prod
      ));
      alert('Produto atualizado com sucesso!');
    } else {
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
      alert('Produto criado com sucesso!');
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || prod.categoryId === parseInt(filterCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="header-content-section">
          <h2 className="page-title">👕 Produtos</h2>
          <p className="page-subtitle">Gerencie o catálogo de produtos da sua loja</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Novo Produto
        </button>
      </div>

      <div className="card">
        <div className="filters-bar">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Todas as Categorias</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Carregando produtos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>Nenhum produto encontrado</h3>
            <p>Comece adicionando produtos ao seu catálogo</p>
            <button className="btn btn-primary" onClick={handleCreate}>
              ➕ Criar Produto
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-badges">
                    {product.isFeatured && (
                      <span className="badge badge-warning">⭐ Destaque</span>
                    )}
                    {!product.isActive && (
                      <span className="badge badge-danger">Inativo</span>
                    )}
                    {product.stock && product.stock < 10 && (
                      <span className="badge badge-warning">Estoque baixo</span>
                    )}
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category?.name}</p>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-details">
                    <div className="product-price">
                      R$ {product.price.toFixed(2)}
                    </div>
                    <div className="product-stock">
                      Estoque: {product.stock || 0}
                    </div>
                  </div>

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="product-sizes">
                      <strong>Tamanhos: </strong>
                      {product.sizes.map((s, idx) => (
                        <span key={idx} className="size-badge">
                          {s.size} ({s.stock})
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="product-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product.id!)}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSave}
          onCancel={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
