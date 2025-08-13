import Link from 'next/link';

import { RecipeList } from '@/components/RecipeList';

export default function RecipesPage() {
  return (
    <div className="px-8">
      <header className="mx-[-2rem] flex justify-between border-b-2 border-gray-300 px-8 py-4 text-4xl md:mx-[-1rem] md:px-4">
        <h1>Recepty</h1>
        <Link href="/add-recipe" className="text-blue-700 hover:text-fuchsia-500">
          +
        </Link>
      </header>
      <RecipeList />
    </div>
  );
}
