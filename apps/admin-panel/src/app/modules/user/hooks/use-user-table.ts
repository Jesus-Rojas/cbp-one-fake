import { Appointment, AuthUser } from '@cbp-one-fake/api-interfaces';
import { useState } from 'react';

import { ColumnDefinition } from '../../core/types/column-definition';
import { useOnInit } from '../../shared/hooks/use-on-init';
import { useUserApi } from './use-user-api';
import { useToast } from '../../core/hooks/use-toast';

export function useUserTable() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number>(0);
  const { getUsers: getUsersApi, removeUser } = useUserApi();
  const { showToast } = useToast();

  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'username',
      field: 'username',
      header: 'Email',
    },
  ];

  const closeDialog = () => {
    setIsOpen(false);
  };

  const deleteUser = async () => {
    setLoadingDelete(true);
    try {
      await removeUser(userIdToDelete);
      showToast(`User ${userIdToDelete} was deleted`);
      closeDialog();
      getUsers();
      setLoadingDelete(false);
    } catch {
      setLoadingDelete(false);
    }
  };

  const getUsers = async () => {
    setLoadingTable(true);
    try {
      const users = await getUsersApi();
      setUsers(users);
      setLoadingTable(false);
    } catch {
      setLoadingTable(false);
    }
  };

  const openDialog = (id: number) => {
    setUserIdToDelete(id);
    setIsOpen(true);
  };

  useOnInit(() => {
    getUsers();
  });

  return {
    loadingTable,
    columnDefinitions,
    appointments: users,
    isOpen,
    closeDialog,
    loadingDelete,
    deleteAppointment: deleteUser,
    openDialog,
  };
}
