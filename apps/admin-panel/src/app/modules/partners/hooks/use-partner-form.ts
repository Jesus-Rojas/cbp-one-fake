import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Partner } from '@zooverse/api-interfaces';
import { PartnerFormProps } from '../components/partner-form';
import { useOnInit } from '../../shared/hooks/use-on-init';
import { FormMode } from '../../core/types/form-mode.enum';
import { usePartnerApi } from './use-partner-api';
import { useToast } from '../../core/hooks/use-toast';

interface PartnerForm extends Partner {
  image: string;
}

export function usePartnerForm(props: PartnerFormProps) {
  const { mode } = props;
  const { id } = useParams();
  const formMethods = useForm<PartnerForm>();
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, reset } = formMethods;
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(false);
  const { createPartner, updatePartner, getPartner } = usePartnerApi();
  const { showToast } = useToast();

  async function create() {
    setLoading(true);
    const { name, description, email, image, discord, opensea, twitter } =
      getValues();
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({ name, description, email, discord, opensea, twitter }),
    );
    formData.append('file', image);
    try {
      await createPartner(formData);
      showToast(`Partner ${name} was created`);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  async function update() {
    setLoading(true);
    const { name, description, email, image, discord, opensea, twitter } =
      getValues();
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({ name, description, email, discord, opensea, twitter }),
    );
    if (image) formData.append('file', image);

    try {
      await updatePartner(Number(id), formData);
      showToast(`Partner ${name} was updated`);
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
    navigate(`/partners`);
  }

  const currentMode = () => {
    if (mode === FormMode.Create) return 'Create a partner';
    if (mode === FormMode.Edit) return 'Update a partner';
    return 'View of partner';
  };

  const getPartnerById = async (id: number) => {
    if (isNaN(+id)) {
      throw new Error("Id isn't valid");
    }

    try {
      const response = await getPartner(Number(id));
      reset(response.partner);
      setPartner(response.partner);
    } catch {
      return;
    }
  };

  useOnInit(() => {
    if (id && mode !== FormMode.Create) {
      getPartnerById(+id);
    }
  });
  return {
    formMethods,
    handleSubmit,
    submit,
    control,
    mode,
    partner,
    loading,
    currentMode,
  };
}
