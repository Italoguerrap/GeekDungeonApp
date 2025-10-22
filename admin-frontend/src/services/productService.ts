import api from './api';
import { Product, ApiResponse, PaginatedResponse } from '../types';

export const productService = {
  // Listar produtos com paginação
  getAll: async (page = 1, pageSize = 10): Promise<PaginatedResponse<Product>> => {
    const response = await api.get<ApiResponse<PaginatedResponse<Product>>>('/products', {
      params: { page, pageSize },
    });
    return response.data.data;
  },

  // Buscar produto por ID
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  // Criar novo produto
  create: async (product: Product): Promise<Product> => {
    const response = await api.post<ApiResponse<Product>>('/products', product);
    return response.data.data;
  },

  // Atualizar produto
  update: async (id: number, product: Product): Promise<Product> => {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    return response.data.data;
  },

  // Deletar produto
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Upload de imagem
  uploadImage: async (productId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post<ApiResponse<{ url: string }>>(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.url;
  },
};
