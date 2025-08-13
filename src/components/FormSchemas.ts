import * as z from 'zod';

export const AddRecipeFormSchema = z.object({
  name: z.string().min(1, 'Recept nemůže být bez názvu.'),
  info: z.string(),
  ingredients: z
    .array(z.object({ value: z.string() }))
    .transform((arr) => arr.map((item) => item.value))
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

export type InputFormData = z.input<typeof AddRecipeFormSchema>;
export type OutputFormData = z.output<typeof AddRecipeFormSchema>;
