import { RecipeDetail } from '@/components/RecipeDetail';
import Link from 'next/link';

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div>
      <header className="relative w-full text-4xl">
        <div className="absolute top-0 right-0 left-0 flex justify-between p-4">
          <Link href="/" className="absolute top-0 left-4 z-1 text-white hover:text-blue-700">
            ←
          </Link>
          <Link
            href="/add-recipe"
            className="absolute top-0 right-4 z-1 text-white hover:text-blue-700"
          >
            +
          </Link>
        </div>
      </header>
      <RecipeDetail id={slug} />
    </div>
  );
}
