import { Partner } from '@zooverse/api-interfaces';
import { useState } from 'react';
import { ColumnDefinition } from '../../core/types/column-definition';
import { useOnInit } from '../../shared/hooks/use-on-init';
import { usePartnerApi } from './use-partner-api';
import { useToast } from '../../core/hooks/use-toast';

export function usePartnerTable() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [partnerIdToDelete, setPartnerIdToDelete] = useState<number>(0);
  const { getPartners: getPartnersApi, removePartner } = usePartnerApi();
  const { showToast } = useToast();

  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'name',
      field: 'name',
      header: 'Name',
    },
    {
      id: 'description',
      field: 'description',
      header: 'Description',
    },
    {
      id: 'email',
      field: 'email',
      header: 'Email',
    },
  ];

  const closeDialog = () => {
    setIsOpen(false);
  };

  const deletePartner = async () => {
    setLoadingDelete(true);
    try {
      await removePartner(partnerIdToDelete);
      showToast(`Partner ${partnerIdToDelete} was deleted`);
      closeDialog();
      getPartners();
      setLoadingDelete(false);
    } catch {
      setLoadingDelete(false);
    }
  };

  const getPartners = async () => {
    setLoadingTable(true);
    try {
      const response = await getPartnersApi();
      setPartners(response.partners);
      setLoadingTable(false);
    } catch {
      setLoadingTable(false);
    }
  };

  const openDialog = (id: number) => {
    setPartnerIdToDelete(id);
    setIsOpen(true);
  };

  useOnInit(() => {
    getPartners();
  });

  return {
    loadingTable,
    columnDefinitions,
    partners,
    isOpen,
    closeDialog,
    loadingDelete,
    deletePartner,
    openDialog,
  };
}
