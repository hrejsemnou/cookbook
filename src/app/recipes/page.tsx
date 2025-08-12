import Link from "next/link";

import { RecipeList } from "@/components/RecipeList";

export default function RecipesPage() {
  return (
    <div>
      <header className="flex justify-between text-4xl border-b-2 py-4 px-8 md:px-4 mx-[-2rem] md:mx-[-1rem] border-gray-300">
        <h1>Recepty</h1>
        <Link
          href="/add-recipe"
          className="text-blue-700 hover:text-fuchsia-500"
        >
          +
        </Link>
      </header>
      <RecipeList />
    </div>
  );
}
