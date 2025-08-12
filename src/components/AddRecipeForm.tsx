'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import * as z from 'zod';

import { useAddRecipeMutation } from '@/lib/store/api';
import { FormPrompt } from '@/components/FormPrompt';
import { FormField } from '@/components/FormField';
import { redirect } from 'next/navigation';
import { MultiFormField } from '@/components/MultiFormField';
import { SubmitButton } from '@/components/SubmitButton';

const FormSchema = z.object({
  name: z.string().min(1, 'Recept nemůže být bez názvu.'),
  info: z.string(),
  ingredients: z
    .array(z.string())
    .transform((arr) => arr.filter((item) => item.trim() !== ''))
    .refine((arr) => arr.length > 0, {
      message: 'Musíte zadat alespoň jednu ingredienci.',
    }),
  description: z.string().min(1, 'Recept nemůže být bez postupu.'),
  duration: z
    .number('Čas musí mít číselnou hodnotu.')
    .int('Čas musí být celé číslo.')
    .positive('Čas musí být kladné číslo.'),
});

type FormData = z.infer<typeof FormSchema>;

const AddRecipeForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      info: '',
      ingredients: [''],
      description: '',
      duration: undefined,
    },
  });

  const [addRecipe] = useAddRecipeMutation();
  const [formSent, setFormSent] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
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
        redirect('/recipes');
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
        <FormField type="number" name="duration" label="Čas" />
        <SubmitButton isSubmitting={methods.formState.isSubmitting} label="Přidat recept" />
      </form>
    </FormProvider>
  );
};

export default AddRecipeForm;
