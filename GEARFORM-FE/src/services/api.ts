// src/services/api.ts
import { mockUsers, mockProducts, mockCategories } from './mockData';
import type { User, Product, Category } from '../types';

// ---- HELPERS ----
const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

// Banco em memória — adicionamos 'password' nos users mockados para o login funcionar
let users: any[] = mockUsers.map(u => ({ ...u, password: '123456' }));
// Usuário admin tem senha diferente para ficar mais realista
users[0].password = 'admin123';

let products = [...mockProducts];
let categories = [...mockCategories];
let nextId = 100;

function paginate<T>(data: T[], page: number, perPage: number) {
  const total = data.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const from = (page - 1) * perPage;
  const sliced = data.slice(from, from + perPage);
  return { data: sliced, total, page, perPage, lastPage };
}

// ---- AUTH ----
export const authService = {
  login: async (email: string, password: string) => {
    await delay();

    const emailNormalized = email.trim().toLowerCase();
    const user = users.find(u => u.email.trim().toLowerCase() === emailNormalized);

    if (!user || user.password !== password) {
      throw { response: { data: { message: 'E-mail ou senha incorretos' } } };
    }

    const token = 'mock-token-' + user.id;
    // Retorna sem o campo password por segurança
    const { password: _pwd, ...safeUser } = user;
    return { data: { token, user: safeUser } };
  },

  register: async (data: Partial<User> & { password?: string; nome?: string; name?: string }) => {
    await delay();

    const emailNormalized = data.email!.trim().toLowerCase();
    if (users.find(u => u.email.trim().toLowerCase() === emailNormalized)) {
      throw { response: { data: { message: 'E-mail já cadastrado' } } };
    }

    // Aceita tanto 'nome' (novo padrão) quanto 'name' (legado) para não quebrar nada
    const nomeValor = data.nome || data.name || '';

    const newUser: any = {
      id: ++nextId,
      nome: nomeValor,
      email: emailNormalized,
      cpf: data.cpf!,
      password: data.password,
      role: 'Usuário',
    };

    users.push(newUser);

    const { password: _pwd, ...safeUser } = newUser;
    return { data: safeUser };
  },

  me: async () => {
    await delay();
    const { password: _pwd, ...safeUser } = users[0];
    return { data: safeUser };
  },
};

// ---- USERS ----
export const userService = {
  list: async (page = 1, perPage = 10) => {
    await delay();
    const safeUsers = users.map(({ password: _p, ...u }) => u);
    return { data: paginate(safeUsers, page, perPage) };
  },

  getById: async (id: number) => {
    await delay();
    const user = users.find(u => u.id === id);
    if (!user) throw { response: { data: { message: 'Usuário não encontrado' } } };
    const { password: _p, ...safeUser } = user;
    return { data: safeUser };
  },

  update: async (id: number, data: Partial<User>) => {
    await delay();
    users = users.map(u => u.id === id ? { ...u, ...data } : u);
    const updated = users.find(u => u.id === id);
    const { password: _p, ...safeUser } = updated;
    return { data: safeUser };
  },

  delete: async (id: number) => {
    await delay();
    users = users.filter(u => u.id !== id);
    return { data: {} };
  },
};

// ---- PRODUCTS ----
export const productService = {
  list: async (page = 1, perPage = 10) => {
    await delay();
    return { data: paginate(products, page, perPage) };
  },

  getById: async (id: number) => {
    await delay();
    const product = products.find(p => p.id === id);
    if (!product) throw { response: { data: { message: 'Produto não encontrado' } } };
    return { data: product };
  },

  create: async (data: Partial<Product>) => {
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

  update: async (id: number, data: Partial<Product>) => {
    await delay();
    const category = categories.find(c => c.id === Number(data.categoryId));
    products = products.map(p =>
      p.id === id
        ? { ...p, ...data, price: Number(data.price), stock: Number(data.stock), category }
        : p
    );
    return { data: products.find(p => p.id === id) };
  },

  delete: async (id: number) => {
    await delay();
    products = products.filter(p => p.id !== id);
    return { data: {} };
  },
};

// ---- CATEGORIES ----
export const categoryService = {
  list: async (page = 1, perPage = 10) => {
    await delay();
    return { data: paginate(categories, page, perPage) };
  },

  listAll: async () => {
    await delay();
    return { data: categories };
  },

  getById: async (id: number) => {
    await delay();
    const category = categories.find(c => c.id === id);
    if (!category) throw { response: { data: { message: 'Categoria não encontrada' } } };
    return { data: category };
  },

  create: async (data: Partial<Category>) => {
    await delay();
    const newCategory: Category = {
      id: ++nextId,
      name: data.name!,
      description: data.description!,
    };
    categories.push(newCategory);
    return { data: newCategory };
  },

  update: async (id: number, data: Partial<Category>) => {
    await delay();
    categories = categories.map(c => c.id === id ? { ...c, ...data } : c);
    return { data: categories.find(c => c.id === id) };
  },

  delete: async (id: number) => {
    await delay();
    categories = categories.filter(c => c.id !== id);
    return { data: {} };
  },
};

export default {};