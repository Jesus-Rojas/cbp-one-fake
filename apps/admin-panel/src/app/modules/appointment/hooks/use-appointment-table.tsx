import { Appointment } from '@cbp-one-fake/api-interfaces';
import { useState } from 'react';

import { ColumnDefinition } from '../../core/types/column-definition';
import { useOnInit } from '../../shared/hooks/use-on-init';
import { useAppointmentApi } from './use-appointment-api';
import { useToast } from '../../core/hooks/use-toast';

export function useAppointmentTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState<number>(0);
  const {
    getAppointments: getAppointmentsApi, 
    removeAppointment, 
    downloadAppointment,
  } = useAppointmentApi();
  const { showToast } = useToast();

  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'email',
      field: 'email',
      header: 'Email',
    },
    {
      id: 'code',
      field: 'code',
      header: 'Code',
    },
    {
      id: 'travelers',
      header: 'Travelers',
      renderer: ({ travelers }: Appointment) => (
        <>
          {travelers[0]?.name}
        </>
      ),
    },
  ];

  const closeDialog = () => {
    setIsOpen(false);
  };

  const deleteAppointment = async () => {
    setLoadingDelete(true);
    try {
      await removeAppointment(appointmentIdToDelete);
      showToast(`Appointment ${appointmentIdToDelete} was deleted`);
      closeDialog();
      getAppointments();
      setLoadingDelete(false);
    } catch {
      setLoadingDelete(false);
    }
  };

  const getAppointments = async () => {
    setLoadingTable(true);
    try {
      const appointments = await getAppointmentsApi();
      setAppointments(appointments);
      setLoadingTable(false);
    } catch {
      setLoadingTable(false);
    }
  };

  const openDialog = (id: number) => {
    setAppointmentIdToDelete(id);
    setIsOpen(true);
  };

  const downloadById = async (id: number) => {
    try {
      const blob = await downloadAppointment(id)
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const a = document.createElement('a');
        a.href = fileReader.result as string;
        a.target = '_blank';
        a.click();
      }
      fileReader.readAsDataURL(blob);
    } catch {
      //
    }
  }

  useOnInit(() => {
    getAppointments();
  });

  return {
    loadingTable,
    columnDefinitions,
    appointments,
    isOpen,
    closeDialog,
    loadingDelete,
    deleteAppointment,
    openDialog,
    downloadById,
  };
}
