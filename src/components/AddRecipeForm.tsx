"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as z from "zod";

import { useAddRecipeMutation } from "@/lib/store/api";
import { FormPrompt } from "@/components/FormPrompt";
import { FormField } from "@/components/FormField";
import { redirect } from "next/navigation";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(1, "Recept nemůže být bez názvu."),
  info: z.string(),
  ingredients: z.string(),
  description: z.string().min(1, "Recept nemůže být bez postupu."),
  duration: z
    .number("Čas musí mít číselnou hodnotu.")
    .int("Čas musí být celé číslo.")
    .positive("Čas musí být kladné číslo."),
});

type FormData = z.infer<typeof FormSchema>;

const AddRecipeForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "all",
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
        ingredients: [ingredients],
        duration,
      }).unwrap();
      setFormSent(true);
      setTimeout(() => {
        redirect("/recipes");
      }, 5000);
    } catch (error: unknown) {
      console.error("Add recipe operation failed:", error);
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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col mt-8"
      >
        <FormField name="name" label="Název receptu" />
        <FormField name="info" label="Úvodní text" />
        <FormField name="ingredients" label="Ingredience" />
        <FormField name="description" label="Postup" />
        <FormField type="number" name="duration" label="Čas" />
        <button
          data-testid="submit-button"
          className="flex flex-row items-center gap-4 p-4 border-2 border-fuchsia-500 rounded-[8px] mt-4 text-fuchsia-500 font-bold self-end cursor-pointer hover:text-blue-700 hover:border-blue-700"
          type="submit"
        >
          <p className="text-2xl">+</p> Přidat recept
        </button>
      </form>
    </FormProvider>
  );
};

export default AddRecipeForm;
