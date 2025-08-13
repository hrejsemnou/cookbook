'use client';
import { useGetRecipeByIdQuery } from '@/lib/store/api';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';
import Image from 'next/image';
import { ScoreStars } from '@/components/ScoreStars';
import { ReviewPanel } from './ReviewPanel';

export const RecipeDetail = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetRecipeByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data) return null;

  return (
    <div className="flex flex-col">
      <div className="relative h-72 w-full">
        <div>
          <Image
            src={'/recipe_detail_placeholder.png'}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full text-2xl">
          <h1 className="px-4 font-bold text-white">{data.name}</h1>
          <div className="mt-2 flex items-center justify-between bg-fuchsia-500 px-4 py-2 text-white">
            <ScoreStars score={data.score} />
            <div className="flex items-center text-sm">⏱ {data.duration} min.</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 text-lg">
        <p className="font-bold">{data.info}</p>

        <div>
          <h2 className="text-2xl font-bold text-blue-700">Ingredience</h2>
          <ul className="m-4 list-inside list-disc">
            {data.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-700">Příprava jídla</h2>
          <p className="mt-4">{data.description}</p>
        </div>
      </div>
      <ReviewPanel recipeId={data.id} />
    </div>
  );
};
