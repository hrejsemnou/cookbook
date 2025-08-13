'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { useAddRecipeMutation } from '@/lib/store/api';
import { FormPrompt } from '@/components/FormPrompt';
import { FormField } from '@/components/FormField';
import { redirect } from 'next/navigation';
import { MultiFormField } from '@/components/MultiFormField';
import { SubmitButton } from '@/components/SubmitButton';
import { AddRecipeFormSchema, InputFormData, OutputFormData } from '@/components/FormSchemas';

const AddRecipeForm = () => {
  const methods = useForm<InputFormData, unknown, OutputFormData>({
    resolver: zodResolver(AddRecipeFormSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      info: '',
      ingredients: [{ value: '' }],
      description: '',
      duration: undefined,
    },
  });

  const [addRecipe] = useAddRecipeMutation();
  const [formSent, setFormSent] = useState(false);

  const onSubmit: SubmitHandler<OutputFormData> = async (data: OutputFormData) => {
    const { name, description, info, ingredients, duration } = data;
    try {
      await addRecipe({
        name,
        description,
        info,
        ingredients,
        duration,
      }).unwrap();
      setFormSent(true);
      setTimeout(() => {
        redirect('/');
      }, 5000);
    } catch (error: unknown) {
      console.error('Add recipe operation failed:', error);
    }
  };

  if (formSent) {
    return (
      <div className="mt-8">
        <p>Recept byl úspěšně uložen. Za malou chvíli budete přesměrováni.</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FormPrompt hasUnsavedChanges={methods.formState.isDirty} />
      <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 flex flex-col">
        <FormField name="name" label="Název receptu" />
        <FormField name="info" label="Úvodní text" />
        <MultiFormField
          name="ingredients"
          topLabel="INGREDIENCE"
          addButtonLabel="+ Přidat"
          label="Vaše ingredience"
        />
        <FormField name="description" label="Postup" />
        <FormField inputType="number" name="duration" label="Čas" />
        <SubmitButton isSubmitting={methods.formState.isSubmitting} label="Přidat recept" />
      </form>
    </FormProvider>
  );
};

export default AddRecipeForm;
