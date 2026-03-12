import type { User, Product, Category } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', cpf: '12345678901', role: 'Admin' },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', cpf: '98765432100', role: 'Usuário' },
  { id: 3, name: 'Carlos Lima', email: 'carlos@email.com', cpf: '45678912300', role: 'Usuário' },
  { id: 4, name: 'Ana Paula', email: 'ana@email.com', cpf: '32165498700', role: 'Usuário' },
  { id: 5, name: 'Pedro Costa', email: 'pedro@email.com', cpf: '65432198700', role: 'Usuário' },
];

export const mockCategories: Category[] = [
  { id: 1, name: 'Eletrônicos', description: 'Produtos eletrônicos em geral' },
  { id: 2, name: 'Roupas', description: 'Vestuário masculino e feminino' },
  { id: 3, name: 'Alimentos', description: 'Produtos alimentícios' },
];

export const mockProducts: Product[] = [
  { id: 1, name: 'Notebook Dell', description: 'Notebook i7 16GB RAM', price: 4500, stock: 10, categoryId: 1, category: { id: 1, name: 'Eletrônicos', description: '' } },
  { id: 2, name: 'iPhone 15', description: 'Smartphone Apple 128GB', price: 7200, stock: 5, categoryId: 1, category: { id: 1, name: 'Eletrônicos', description: '' } },
  { id: 3, name: 'Camiseta Polo', description: 'Camiseta polo masculina', price: 89.90, stock: 50, categoryId: 2, category: { id: 2, name: 'Roupas', description: '' } },
  { id: 4, name: 'Arroz 5kg', description: 'Arroz branco tipo 1', price: 25.90, stock: 200, categoryId: 3, category: { id: 3, name: 'Alimentos', description: '' } },
  { id: 5, name: 'Mouse Gamer', description: 'Mouse RGB 12000 DPI', price: 299, stock: 0, categoryId: 1, category: { id: 1, name: 'Eletrônicos', description: '' } },
];