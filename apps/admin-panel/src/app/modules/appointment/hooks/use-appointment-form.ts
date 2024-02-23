import { Appointment, Traveler } from '@cbp-one-fake/api-interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { AppointmentFormProps } from '../components/appointment-form';
import { useOnInit } from '../../shared/hooks/use-on-init';
import { FormMode } from '../../core/types/form-mode.enum';
import { useAppointmentApi } from './use-appointment-api';
import { useToast } from '../../core/hooks/use-toast';

interface NewTraveler extends Omit<Traveler, 'birthday'> {
  birthday: dayjs.Dayjs;
}

interface NewAppointment extends Omit<Appointment, 'dateTime' | 'travelers'> {
  dateTime: dayjs.Dayjs;
  travelers: NewTraveler[]
}

export function useAppointmentForm(props: AppointmentFormProps) {
  const { mode } = props;
  const { id } = useParams();
  const formMethods = useForm<NewAppointment>();
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, reset, watch, setValue } = formMethods;
  const [loading, setLoading] = useState(false);
  const { createAppointment, updateAppointment, getAppointments } = useAppointmentApi();
  const { showToast } = useToast();
  const travelersForm = watch('travelers');

  async function create() {
    setLoading(true);
    const { code, dateTime, email, place, travelers } = getValues();
    try {
      await createAppointment({ 
        code, 
        dateTime: new Date(dateTime.toISOString()), 
        email, 
        place, 
        travelers: (travelers ?? []).map((traveler) => ({
          ...traveler,
          birthday: new Date(traveler.birthday.toISOString()),
        }))
      });
      showToast('Appointment was created');
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function update() {
    setLoading(true);
    const { code, dateTime, email, place, travelers } = getValues();

    try {
      await updateAppointment(
        Number(id),
        { 
          code, 
          dateTime: new Date(dateTime.toString()), 
          email, 
          place, 
          travelers: (travelers ?? []).map((traveler) => ({
            ...traveler,
            birthday: new Date(traveler.birthday.toString()),
          }))
        }
      );
      showToast('Appointment was updated');
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function submit() {
    if (mode === FormMode.Create) {
      await create();
    }

    if (mode === FormMode.Edit) {
      await update();
    }
    
    navigate(`/appointments`);
  }

  const currentMode = () => {
    if (mode === FormMode.Create) return 'Create an appointment';
    if (mode === FormMode.Edit) return 'Update an appointment';
    return 'View of appointment';
  };

  const getAppointmentById = async (id: number) => {
    if (isNaN(+id)) {
      throw new Error("Id isn't valid");
    }

    try {
      const appointments = await getAppointments();
      const appointment = appointments.find((appointment) => appointment.id === Number(id));
      if (!appointment) return;
      
      reset({
        ...appointment,
        dateTime: appointment.dateTime ? dayjs(appointment.dateTime) : dayjs(),
        travelers: appointment.travelers.map((traveler) => ({
          ...traveler,
          birthday: traveler.birthday ? dayjs(traveler.birthday) : dayjs(),
        }))
      });
    } catch {
      //
    }
  };

  const addTraveler = () => {
    setValue('travelers', [
      ...(travelersForm ?? []),
      {
        name: '',
        numberOfConfirmation: 0,
        birthday: dayjs(),
      },
    ]);
  }

  const removeTraveler = (indexToRemove: number) => {
    setValue('travelers', travelersForm.filter((__, index) => index !== indexToRemove));
  }

  useOnInit(() => {
    if (id && mode !== FormMode.Create) {
      getAppointmentById(+id);
    }
  });

  return {
    formMethods,
    handleSubmit,
    submit,
    control,
    mode,
    loading,
    currentMode,
    travelersForm,
    addTraveler,
    removeTraveler,
  };
}
