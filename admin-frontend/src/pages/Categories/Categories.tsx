import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import CategoryForm from './CategoryForm';
import './Categories.css';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - substituir pela chamada real da API
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoading(true);
    // Simular carregamento
    setTimeout(() => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Camisetas', description: 'Camisetas diversas', isActive: true, createdAt: '2025-01-15' },
        { id: 2, name: 'Moletons', description: 'Moletons e hoodies', isActive: true, createdAt: '2025-01-16' },
        { id: 3, name: 'Canecas', description: 'Canecas personalizadas', isActive: true, createdAt: '2025-01-17' },
        { id: 4, name: 'Adesivos', description: 'Adesivos e patches', isActive: false, createdAt: '2025-01-18' },
        { id: 5, name: 'Pôsteres', description: 'Pôsteres e quadros', isActive: true, createdAt: '2025-01-19' },
      ];
      setCategories(mockCategories);
      setLoading(false);
    }, 800);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      alert('Categoria excluída com sucesso!');
    }
  };

  const handleSave = (category: Category) => {
    if (editingCategory) {
      // Atualizar categoria existente
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...category, id: cat.id } : cat
      ));
      alert('Categoria atualizada com sucesso!');
    } else {
      // Criar nova categoria
      const newCategory = { ...category, id: Date.now() };
      setCategories([...categories, newCategory]);
      alert('Categoria criada com sucesso!');
    }
    setShowModal(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories-page">
      <div className="page-header">
        <div className="header-content-section">
          <h2 className="page-title">📁 Categorias</h2>
          <p className="page-subtitle">Gerencie as categorias dos seus produtos</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Nova Categoria
        </button>
      </div>

      <div className="card">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Carregando categorias...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>Nenhuma categoria encontrada</h3>
            <p>Comece criando sua primeira categoria</p>
            <button className="btn btn-primary" onClick={handleCreate}>
              ➕ Criar Categoria
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Status</th>
                  <th>Data de Criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <strong>{category.name}</strong>
                    </td>
                    <td>{category.description}</td>
                    <td>
                      <span className={`badge ${category.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {category.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>{new Date(category.createdAt!).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-icon-edit"
                          onClick={() => handleEdit(category)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon btn-icon-delete"
                          onClick={() => handleDelete(category.id!)}
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSave}
          onCancel={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default Categories;
