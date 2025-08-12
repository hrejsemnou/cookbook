import Recipe from "@/lib/types/Recipe";
import Image from "next/image";
import Link from "next/link";

export const RecipeListItem = ({ recipe }: { recipe: Recipe }) => {
  return (
    <li>
      <Link
        href={`/recipe-detail/${recipe.id}`}
        className="group flex py-4 gap-4"
      >
        <Image
          src="/recipe_placeholder.png"
          alt="recipe_picture"
          width="100"
          height="100"
          className="w-[100px] h-[100px] object-cover flex-shrink-0"
        />
        <div className="flex flex-col gap-1 justify-center">
          <span className="group-hover:text-fuchsia-500 font-bold text-2xl text-blue-700">
            {recipe.name}
          </span>
          <div className="text-xl">
            {Array.from({ length: recipe.score }, (_, i) => (
              <span key={i} className="text-fuchsia-500">
                ★
              </span>
            ))}
            {Array.from({ length: 5 - recipe.score }, (_, i) => (
              <span key={i} className="text-fuchsia-500">
                ☆
              </span>
            ))}
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
