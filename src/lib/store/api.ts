import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Recipe from "@/lib/types/Recipe";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "cookbookApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://my-json-server.typicode.com/AckeeCZ/web-task-cookbook-fake-api",
  }),
  tagTypes: ["Recipes"],
  endpoints: (build) => ({
    getRecipes: build.query<Recipe[], void>({
      query: () => `recipes`,
    }),
    getRecipeById: build.query<Recipe, string>({
      query: (recipeId) => `/recipe-details/${recipeId}`,
    }),
    addRecipe: build.mutation({
      query: (formData) => ({
        url: "/recipes",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddRecipeMutation,
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
} = api;
