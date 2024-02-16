import { useNavigate, useParams } from 'react-router-dom';
import { FormMode } from '../../../core/types/form-mode.enum';
import styles from './custom-prize-form.module.scss';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCustomPrizes } from '../../hooks/use-custom-prizes';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { LoadingButton } from '@mui/lab';
import { Avatar } from '@mui/material';
import { requiredValidator, TextField, FileUpload } from '@zooverse/ui-forms';
import { Header } from '../../../core/components/headers/header';
import { useToast } from '../../../core/hooks/use-toast';

export interface CustomPrizesProps {
  mode: FormMode;
}

export function CustomPrizeForm(props: CustomPrizesProps) {
  const { mode } = props;
  const { findById, customPrize, loading, createPrize, updatePrize } =
    useCustomPrizes();
  const { id } = useParams();
  const formMethods = useForm();
  const navigate = useNavigate();
  const { control, handleSubmit, getValues, setValue } = formMethods;
  const { showToast } = useToast();

  const currentMode = () => {
    if (mode === FormMode.Create) return 'Create a custom prize';
    if (mode === FormMode.Edit) return 'Update custom prize';
    return 'View of custom prize';
  };

  async function create() {
    const { name, description, image } = getValues();
    const data = new FormData();
    data.append('data', JSON.stringify({ name, description }));
    data.append('file', image);
    await createPrize(data);
    showToast(`New custom prize ${name} was created`);
  }

  async function update() {
    const { name, description, image } = getValues();
    const data = new FormData();
    data.append('data', JSON.stringify({ name, description }));
    if (image) {
      data.append('file', image);
    }
    if (id) {
      await updatePrize(+id, data);
      showToast(`Custom prize ${name} updated`);
    }
  }
  async function submit() {
    if (mode === FormMode.Create) {
      await create();
    }

    if (mode === FormMode.Edit) {
      await update();
    }
    navigate('/custom-prizes');
  }
  useOnInit(() => {
    if (id && mode !== FormMode.Create && !isNaN(+id)) {
      findById(+id);
    }
  });

  useEffect(() => {
    setValue('name', customPrize.name);
    setValue('description', customPrize.description);
  }, [customPrize, setValue]);

  return (
    <div className={styles['container']}>
      <Header title={'Custom prizes'} subtitle={currentMode()} />

      <FormProvider {...formMethods}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles['section-container']}>
              <div className={styles['section-content']}>
                <TextField
                  name="name"
                  control={control}
                  label="Name"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  margin="dense"
                />

                <TextField
                  name="description"
                  control={control}
                  label="Description"
                  validators={[requiredValidator()]}
                  disabled={mode === FormMode.View}
                  fullWidth
                  multiline
                  rows="4"
                />

                {mode !== FormMode.View && (
                  <>
                    <div className={styles['sub-title']}>Image</div>
                    <FileUpload
                      name="image"
                      control={control}
                      types={['PNG', 'JPG', 'JPEG']}
                      validators={
                        mode === FormMode.Create
                          ? [requiredValidator()]
                          : undefined
                      }
                    />
                  </>
                )}

                {mode !== FormMode.Create && customPrize?.imageUrl && (
                  <>
                    <div className={styles['sub-title']}>Image Saved</div>
                    <Avatar
                      alt={`${customPrize.name} image`}
                      src={customPrize.imageUrl}
                    />
                  </>
                )}
              </div>
            </div>

            <br />

            {mode !== FormMode.View && (
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
              >
                {mode === FormMode.Create && <span>Create</span>}
                {mode === FormMode.Edit && <span>Update</span>}
              </LoadingButton>
            )}
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
