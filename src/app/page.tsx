import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href="recipes">Recepty</Link>
      <Link href="add-recipe">Přidat recept</Link>
      <Link href="recipe-detail/58777f22b23541fc058c789f">Detail receptu</Link>
    </div>
  );
}
