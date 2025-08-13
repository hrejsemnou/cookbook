import Recipe from '@/lib/types/Recipe';
import Image from 'next/image';
import Link from 'next/link';
import { ScoreStars } from '@/components/ScoreStars';

export const RecipeListItem = ({ recipe }: { recipe: Recipe }) => {
  return (
    <li>
      <Link href={`/recipe-detail/${recipe.id}`} className="group flex gap-4 py-4">
        <Image
          src="/recipe_placeholder.png"
          alt="recipe_picture"
          width="100"
          height="100"
          className="h-[100px] w-[100px] flex-shrink-0 object-cover"
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="text-2xl font-bold text-blue-700 group-hover:text-fuchsia-500">
            {recipe.name}
          </span>
          <div className="text-xl text-fuchsia-500">
            <ScoreStars score={recipe.score} />
          </div>
          <div className="flex gap-2 text-xl">
            <span>⏲</span>
            <span>{recipe.duration} min.</span>
          </div>
        </div>
      </Link>
    </li>
  );
};
