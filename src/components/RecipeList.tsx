"use client";
import { RecipeListItem } from "./RecipeListItem";
import { useGetRecipesQuery } from "@/lib/store/api";

export const RecipeList = () => {
  const { data, error, isLoading } = useGetRecipesQuery();

  if (data && !isLoading && !error) {
    return (
      <ul>
        {data.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    );
  } else
    return (
      <div>
        <p>{isLoading}</p>
        <p>{!!error}</p>
      </div>
    );
};
