
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/api';
import { isValidCPF, formatCPF, getPasswordStrength, getApiErrorMessage } from '../../utils';
import { AppLayout, PageHeader } from '../../components/layout';
import { Input, Button, Alert, Card } from '../../components/ui';
import type { User } from '../../types';


function PasswordStrengthBar({ password }: { password: string }) {
  if (!password) return null;
  const { score, label, color } = getPasswordStrength(password);

  return (
    <div className="mt-1">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all"
            style={{ backgroundColor: i <= score ? color : '#e5e7eb' }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color }}>
        Força: {label}
      </p>
    </div>
  );
}


function UserInfoCard() {
  const { user } = useAuth();
  return (
    <Card className="p-5 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            CPF: {user?.cpf ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '—'}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    cpf: user?.cpf
      ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    
    if (formData.password) {
      const { score } = getPasswordStrength(formData.password);
      if (score < 3) {
        newErrors.password = 'Senha fraca. Use maiúsculas, números e símbolos';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirme a nova senha';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      const payload: Record<string, string> = {
        name: formData.name,
        cpf: formData.cpf.replace(/\D/g, ''),
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await userService.update(user.id, payload) as { data: User };
updateUser(response.data); 
      setSuccessMessage('Perfil atualizado com sucesso!');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Meu Perfil"
        subtitle="Gerencie suas informações pessoais"
      />

      <div className="max-w-lg">
    
        <UserInfoCard />

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-5">Editar informações</h3>

          {successMessage && (
            <div className="mb-4">
              <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} />
            </div>
          )}

          {apiError && (
            <div className="mb-4">
              <Alert type="error" message={apiError} onClose={() => setApiError('')} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nome"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              required
            />

            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-500 flex-1">{user?.email}</span>
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">Não editável</span>
              </div>
              <p className="text-xs text-gray-400">O e-mail não pode ser alterado</p>
            </div>

            <Input
              label="CPF"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              error={errors.cpf}
              maxLength={14}
              required
            />

            <div className="border-t border-gray-100 pt-4 mt-1">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Alterar senha <span className="text-gray-400 font-normal">(opcional)</span>
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <Input
                    label="Nova senha"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    error={errors.password}
                    placeholder="Deixe em branco para manter"
                  />
                  <PasswordStrengthBar password={formData.password} />
                </div>

                <Input
                  label="Confirmar nova senha"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="Repita a nova senha"
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} size="lg">
              Salvar alterações
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}