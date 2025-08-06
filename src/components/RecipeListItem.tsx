import Recipe from "@/lib/types/Recipe";

export const RecipeListItem = ({ recipe }: { recipe: Recipe }) => {
  return (
    <li>
      <div>{recipe.name}</div>
      <div>{recipe.duration}</div>
      <div>{recipe.score}</div>
    </li>
  );
};
