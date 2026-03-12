
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/layout';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import DashboardPage from './pages/users/DashboardPage';

import UsersListPage from './pages/users/UsersListPage';
import UserFormPage from './pages/users/UserFormPage';
import ProfilePage from './pages/users/ProfilePage';

import ProductsListPage from './pages/products/ProductsListPage';
import ProductFormPage from './pages/products/ProductFormPage';

import CategoriesListPage from './pages/categories/CategoriesListPage';
import CategoryFormPage from './pages/categories/CategoryFormPage';

export default function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />


          <Route
            path="/dashboard"
            element={<PrivateRoute><DashboardPage /></PrivateRoute>}
          />
          <Route
            path="/profile"
            element={<PrivateRoute><ProfilePage /></PrivateRoute>}
          />

          <Route path="/users" element={<PrivateRoute><UsersListPage /></PrivateRoute>} />
          <Route path="/users/new" element={<PrivateRoute><UserFormPage /></PrivateRoute>} />
          <Route path="/users/:id/edit" element={<PrivateRoute><UserFormPage /></PrivateRoute>} />


          <Route path="/products" element={<PrivateRoute><ProductsListPage /></PrivateRoute>} />
          <Route path="/products/new" element={<PrivateRoute><ProductFormPage /></PrivateRoute>} />
          <Route path="/products/:id/edit" element={<PrivateRoute><ProductFormPage /></PrivateRoute>} />


          <Route path="/categories" element={<PrivateRoute><CategoriesListPage /></PrivateRoute>} />
          <Route path="/categories/new" element={<PrivateRoute><CategoryFormPage /></PrivateRoute>} />
          <Route path="/categories/:id/edit" element={<PrivateRoute><CategoryFormPage /></PrivateRoute>} />


          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}