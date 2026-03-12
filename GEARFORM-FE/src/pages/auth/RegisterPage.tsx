
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import { isValidEmail, isValidCPF, formatCPF, getApiErrorMessage } from '../../utils';
import { AuthLayout } from '../../components/layout';
import { Input, Button, Alert } from '../../components/ui';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    const formatted = field === 'cpf' ? formatCPF(value) : value;
    setFormData(prev => ({ ...prev, [field]: formatted }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Digite um e-mail válido';
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
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
      await authService.register({
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ''), // envia só números
        password: formData.password,
      });

      
      navigate('/login', {
        state: { successMessage: 'Cadastro realizado! Faça login para continuar.' },
      });
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Criar conta</h2>
        <p className="text-gray-500 text-sm mt-1">Preencha os dados abaixo para se cadastrar</p>
      </div>

      {apiError && (
        <div className="mb-4">
          <Alert type="error" message={apiError} onClose={() => setApiError('')} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nome completo"
          type="text"
          placeholder="João da Silva"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="CPF"
          type="text"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={(e) => handleChange('cpf', e.target.value)}
          error={errors.cpf}
          maxLength={14}
          required
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          hint="Mínimo 8 caracteres"
          required
        />

        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Digite a senha novamente"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" fullWidth isLoading={isLoading} size="lg">
          Criar conta
        </Button>
      </form>

      <div className="mt-5 text-center text-sm text-gray-500">
        Já tem conta?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline font-medium">
          Entrar
        </Link>
      </div>
    </AuthLayout>
  );
}