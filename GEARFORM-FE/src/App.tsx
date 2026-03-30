// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import LoginPage    from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// App pages
import Home              from "./pages/Home";
import DashboardPage     from "./pages/users/DashboardPage";
import UsersListPage     from "./pages/users/UsersListPage";
import UserFormPage      from "./pages/users/UserFormPage";
import ProductsListPage  from "./pages/products/ProductsListPage";
import ProductFormPage   from "./pages/products/ProductFormPage";
import CategoriesListPage from "./pages/categories/CategoriesListPage";
import CategoryFormPage  from "./pages/categories/CategoryFormPage";

// Rota protegida (já existe em layout/index.tsx)
import { PrivateRoute } from "./components/layout";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/"         element={<Home />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protegidas — exigem login */}
      <Route path="/dashboard" element={
        <PrivateRoute><DashboardPage /></PrivateRoute>
      }/>

      <Route path="/users" element={
        <PrivateRoute><UsersListPage /></PrivateRoute>
      }/>
      <Route path="/users/new" element={
        <PrivateRoute><UserFormPage /></PrivateRoute>
      }/>
      <Route path="/users/:id/edit" element={
        <PrivateRoute><UserFormPage /></PrivateRoute>
      }/>

      <Route path="/products" element={
        <PrivateRoute><ProductsListPage /></PrivateRoute>
      }/>
      <Route path="/products/new" element={
        <PrivateRoute><ProductFormPage /></PrivateRoute>
      }/>
      <Route path="/products/:id/edit" element={
        <PrivateRoute><ProductFormPage /></PrivateRoute>
      }/>

      <Route path="/categories" element={
        <PrivateRoute><CategoriesListPage /></PrivateRoute>
      }/>
      <Route path="/categories/new" element={
        <PrivateRoute><CategoryFormPage /></PrivateRoute>
      }/>
      <Route path="/categories/:id/edit" element={
        <PrivateRoute><CategoryFormPage /></PrivateRoute>
      }/>

      {/* Qualquer rota desconhecida redireciona para home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;