import { RecipeDetail } from '@/components/RecipeDetail';

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <RecipeDetail id={slug} />;
}
