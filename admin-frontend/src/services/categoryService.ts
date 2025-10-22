import api from './api';
import { Category, ApiResponse } from '../types';

export const categoryService = {
  // Listar todas as categorias
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },

  // Buscar categoria por ID
  getById: async (id: number): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  // Criar nova categoria
  create: async (category: Category): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>('/categories', category);
    return response.data.data;
  },

  // Atualizar categoria
  update: async (id: number, category: Category): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, category);
    return response.data.data;
  },

  // Deletar categoria
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
