import { useAddRatingMutation } from '@/lib/store/api';
import { useState } from 'react';

export const ReviewPanel = ({ recipeId }: { recipeId: string }) => {
  const [addRating] = useAddRatingMutation();
  const [hover, setHover] = useState(0);

  const handleStarClick = async (score: number) => {
    try {
      await addRating({ recipeId, formData: { score } });
    } catch (error: unknown) {
      console.error('Add rating operation failed:', error);
    }
  };

  return (
    <div className="mt-4 w-full bg-blue-700 p-4 text-center text-white">
      <p className="text-2xl font-bold">Ohodnoť tento recept</p>
      <div className="mt-4 text-6xl">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            data-testid={`score-${i + 1}`}
            onMouseOver={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer"
            key={i}
            onClick={() => handleStarClick(i + 1)}
          >
            {i < hover ? '★' : '☆'}
          </button>
        ))}
      </div>
    </div>
  );
};
