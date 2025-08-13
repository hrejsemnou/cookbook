import AddRecipeForm from '@/components/AddRecipeForm';
import Link from 'next/link';

export default function AddRecipePage() {
  return (
    <div className="px-8">
      <header className="mx-[-2rem] flex gap-8 border-b-2 border-gray-300 px-8 py-4 text-4xl md:mx-[-1rem] md:px-4">
        <Link href="/recipes" className="text-blue-700 hover:text-fuchsia-500">
          ←
        </Link>
        <h1>Přidat recept</h1>
      </header>
      <AddRecipeForm />
    </div>
  );
}
