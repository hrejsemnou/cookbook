"use client";
import { useGetRecipeByIdQuery } from "@/lib/store/api";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";

export const RecipeDetail = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetRecipeByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    data && (
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
    )
  );
};
