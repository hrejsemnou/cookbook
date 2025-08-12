import AddRecipeForm from "@/components/AddRecipeForm";
import Link from "next/link";

export default function AddRecipePage() {
  return (
    <div>
      <header className="flex text-4xl gap-8 border-b-2 py-4 px-8 md:px-4 mx-[-2rem] md:mx-[-1rem] border-gray-300">
        <Link href="/recipes" className="text-blue-700 hover:text-fuchsia-500">
          ←
        </Link>
        <h1>Přidat recept</h1>
      </header>
      <AddRecipeForm />
    </div>
  );
}
