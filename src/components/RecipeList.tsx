"use client";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { RecipeListItem } from "./RecipeListItem";
import { useGetRecipesQuery } from "@/lib/store/api";

export const RecipeList = () => {
  const { data, error, isLoading } = useGetRecipesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <ul>
      {data?.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
};
