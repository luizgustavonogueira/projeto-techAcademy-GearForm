// =====================================================
// PÁGINA DE LISTAGEM DE USUÁRIOS (CRUD)
// =====================================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/api';
import  type { User, PaginatedResponse } from '../../types';
import { formatCPF, getApiErrorMessage } from '../../utils';
import { AppLayout, PageHeader } from '../../components/layout';
import {
  Button, Card, Alert, LoadingSpinner,
  EmptyState, Pagination, ConfirmModal, Badge
} from '../../components/ui';

// Componente exclusivo da página: linha da tabela
function UserRow({
  user,
  onDelete,
}: {
  user: User;
  onDelete: (user: User) => void;
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0">
            {user.name[0].toUpperCase()}
          </div>
          <span className="font-medium text-gray-900 text-sm">{user.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {user.cpf ? formatCPF(user.cpf) : '—'}
      </td>
      <td className="px-4 py-3">
        <Badge color="blue">{user.role || 'Usuário'}</Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to={`/users/${user.id}/edit`}>
            <Button variant="secondary" size="sm">Editar</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => onDelete(user)}>
            Excluir
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({ page: 1, lastPage: 1, total: 0, perPage: 10 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await userService.list(page, 10);
      const data: PaginatedResponse<User> = response.data;
      setUsers(data.data);
      setPagination({ page: data.page, lastPage: data.lastPage, total: data.total, perPage: data.perPage });
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await userService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchUsers(pagination.page);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Usuários"
        subtitle={`${pagination.total} usuário(s) cadastrado(s)`}
        action={
          <Link to="/users/new">
            <Button>+ Novo Usuário</Button>
          </Link>
        }
      />

      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} onClose={() => setError('')} />
        </div>
      )}

      <Card>
        {isLoading ? (
          <LoadingSpinner />
        ) : users.length === 0 ? (
          <EmptyState
            title="Nenhum usuário encontrado"
            description="Comece criando um novo usuário."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nome</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">E-mail</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">CPF</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Perfil</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={pagination.page}
              lastPage={pagination.lastPage}
              total={pagination.total}
              perPage={pagination.perPage}
              onPageChange={fetchUsers}
            />
          </>
        )}
      </Card>

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Excluir usuário"
        message={`Tem certeza que deseja excluir "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </AppLayout>
  );
}