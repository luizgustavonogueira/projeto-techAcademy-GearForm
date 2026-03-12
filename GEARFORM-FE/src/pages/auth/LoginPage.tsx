
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail, getApiErrorMessage } from '../../utils';
import { AuthLayout } from '../../components/layout';
import { Input, Button, Alert } from '../../components/ui';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Digite um e-mail válido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
    
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h2>
        <p className="text-gray-500 text-sm mt-1">Entre com suas credenciais para acessar</p>
      </div>

     
      {apiError && (
        <div className="mb-4">
          <Alert type="error" message={apiError} onClose={() => setApiError('')} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />

        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          required
          autoComplete="current-password"
        />

        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
          Entrar
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-gray-500">
        Não tem conta?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
          Cadastre-se
        </Link>
      </div>
    </AuthLayout>
  );
}