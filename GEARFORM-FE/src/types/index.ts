
export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  cpf: string;

  confirmPassword: string;
  password?: string;
}

export interface EditUserData {
  name: string;
  cpf: string;
  password?: string;
  confirmPassword?: string;
}


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category?: Category;
  stock: number;
  createdAt?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number | string;
  categoryId: number | string;
  stock: number | string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}


export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

