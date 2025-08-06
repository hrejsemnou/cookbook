"use client";
import { useGetRecipeByIdQuery } from "@/lib/store/api";

export const RecipeDetail = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetRecipeByIdQuery(id);

  if (data && !isLoading && !error) {
    return (
      <dl>
        <dt>Název</dt>
        <dd>{data.name}</dd>
        <dt>Popis</dt>
        <dd>{data.description}</dd>
        <dt>Hodnocení</dt>
        <dd>{data.score}</dd>
        <dt>Info</dt>
        <dd>{data.info}</dd>
        <dt>Délka</dt>
        <dd>{data.duration}</dd>
        <dt>Ingredience</dt>
        <dd>
          <ul>
            {data.ingredients?.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </dd>
      </dl>
    );
  }
};
