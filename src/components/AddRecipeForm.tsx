"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { useAddRecipeMutation } from "@/lib/store/api";

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  info: z.string(),
  ingredients: z.string(),
  duration: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

const AddRecipeForm = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const [addRecipe] = useAddRecipeMutation();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const { name, description, info, ingredients, duration } = data;
    try {
      const response = await addRecipe({
        name,
        description,
        info,
        ingredients: [ingredients],
        duration,
      }).unwrap();
      if (response.ok) {
        console.log(response);
      }
    } catch (error: unknown) {
      console.error("Add recipe operation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Název</label>
      <input {...register("name")} />
      <label htmlFor="description">Popis</label>
      <input {...register("description")} />
      <label htmlFor="info">Info</label>
      <input {...register("info")} />
      <label htmlFor="ingredients">Ingredience</label>
      <input {...register("ingredients")} />
      <label htmlFor="duration">Délka</label>
      <input {...register("duration")} />
      <button type="submit">Přidat recept</button>
    </form>
  );
};

export default AddRecipeForm;
