// src/services/api.ts
import { mockUsers, mockProducts, mockCategories } from './mockData';
import type { User, Product, Category, PaginatedResponse } from '../types';

// ---- HELPERS ----
const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

interface UserWithPassword extends User {
  password: string;
}

// Banco em memória
let users: UserWithPassword[] = mockUsers.map(u => ({ ...u, password: '123456' }));
users[0].password = 'admin123';

let products: Product[] = [...mockProducts];
let categories: Category[] = [...mockCategories];
let nextId = 100;

function paginate<T>(data: T[], page: number, perPage: number): PaginatedResponse<T> {
  const total = data.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const from = (page - 1) * perPage;
  const sliced = data.slice(from, from + perPage);
  return { data: sliced, total, page, perPage, lastPage };
}

// ---- AUTH ----
export const authService = {
  login: async (email: string, password: string): Promise<{ data: { token: string; user: User } }> => {
    await delay();
    const emailNormalized = email.trim().toLowerCase();
    const found = users.find(u => u.email.trim().toLowerCase() === emailNormalized);
    if (!found || found.password !== password) {
      throw { response: { data: { message: 'E-mail ou senha incorretos' } } };
    }
    const token = 'mock-token-' + found.id;
    const { password: _pwd, ...safeUser } = found;
    return { data: { token, user: safeUser } };
  },

  register: async (data: { name: string; email: string; cpf: string; password: string }): Promise<{ data: User }> => {
    await delay();
    const emailNormalized = data.email.trim().toLowerCase();
    if (users.find(u => u.email.trim().toLowerCase() === emailNormalized)) {
      throw { response: { data: { message: 'E-mail já cadastrado' } } };
    }
    const newUser: UserWithPassword = {
      id: ++nextId,
      name: data.name,
      email: emailNormalized,
      cpf: data.cpf,
      password: data.password,
      role: 'Usuário',
    };
    users.push(newUser);
    const { password: _pwd, ...safeUser } = newUser;
    return { data: safeUser };
  },

  me: async (): Promise<{ data: User }> => {
    await delay();
    const { password: _pwd, ...safeUser } = users[0];
    return { data: safeUser };
  },
};

// ---- USERS ----
export const userService = {
  list: async (page = 1, perPage = 10): Promise<{ data: PaginatedResponse<User> }> => {
    await delay();
    const safeUsers: User[] = users.map(({ password: _p, ...u }) => u);
    return { data: paginate(safeUsers, page, perPage) };
  },

  getById: async (id: number): Promise<{ data: User }> => {
    await delay();
    const found = users.find(u => u.id === id);
    if (!found) throw { response: { data: { message: 'Usuário não encontrado' } } };
    const { password: _p, ...safeUser } = found;
    return { data: safeUser };
  },

  update: async (id: number, data: Partial<User>): Promise<{ data: User }> => {
    await delay();
    users = users.map(u => u.id === id ? { ...u, ...data } : u);
    const updated = users.find(u => u.id === id)!;
    const { password: _p, ...safeUser } = updated;
    return { data: safeUser };
  },

  delete: async (id: number): Promise<{ data: Record<string, never> }> => {
    await delay();
    users = users.filter(u => u.id !== id);
    return { data: {} };
  },
};

// ---- PRODUCTS ----
export const productService = {
  list: async (page = 1, perPage = 10): Promise<{ data: PaginatedResponse<Product> }> => {
    await delay();
    return { data: paginate(products, page, perPage) };
  },

  getById: async (id: number): Promise<{ data: Product }> => {
    await delay();
    const found = products.find(p => p.id === id);
    if (!found) throw { response: { data: { message: 'Produto não encontrado' } } };
    return { data: found };
  },

  create: async (data: Partial<Product>): Promise<{ data: Product }> => {
    await delay();
    const category = categories.find(c => c.id === Number(data.categoryId));
    const newProduct: Product = {
      id: ++nextId,
      name: data.name!,
      description: data.description!,
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: Number(data.categoryId),
      category,
    };
    products.push(newProduct);
    return { data: newProduct };
  },

  update: async (id: number, data: Partial<Product>): Promise<{ data: Product | undefined }> => {
    await delay();
    const category = categories.find(c => c.id === Number(data.categoryId));
    products = products.map(p =>
      p.id === id
        ? { ...p, ...data, price: Number(data.price), stock: Number(data.stock), category }
        : p
    );
    return { data: products.find(p => p.id === id) };
  },

  delete: async (id: number): Promise<{ data: Record<string, never> }> => {
    await delay();
    products = products.filter(p => p.id !== id);
    return { data: {} };
  },
};

// ---- CATEGORIES ----
export const categoryService = {
  list: async (page = 1, perPage = 10): Promise<{ data: PaginatedResponse<Category> }> => {
    await delay();
    return { data: paginate(categories, page, perPage) };
  },

  listAll: async (): Promise<{ data: Category[] }> => {
    await delay();
    return { data: categories };
  },

  getById: async (id: number): Promise<{ data: Category }> => {
    await delay();
    const found = categories.find(c => c.id === id);
    if (!found) throw { response: { data: { message: 'Categoria não encontrada' } } };
    return { data: found };
  },

  create: async (data: Partial<Category>): Promise<{ data: Category }> => {
    await delay();
    const newCategory: Category = {
      id: ++nextId,
      name: data.name!,
      description: data.description!,
    };
    categories.push(newCategory);
    return { data: newCategory };
  },

  update: async (id: number, data: Partial<Category>): Promise<{ data: Category | undefined }> => {
    await delay();
    categories = categories.map(c => c.id === id ? { ...c, ...data } : c);
    return { data: categories.find(c => c.id === id) };
  },

  delete: async (id: number): Promise<{ data: Record<string, never> }> => {
    await delay();
    categories = categories.filter(c => c.id !== id);
    return { data: {} };
  },
};

export default {};