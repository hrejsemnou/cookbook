import { fireEvent, render, screen } from '@testing-library/react';
import { RecipeDetail } from '@/components/RecipeDetail';
import { useAddRatingMutation, useGetRecipeByIdQuery } from '@/lib/store/api';

jest.mock('@/lib/store/api', () => ({
  useGetRecipeByIdQuery: jest.fn(),
  useAddRatingMutation: jest.fn(),
}));

const mockRecipe = {
  id: '1',
  name: 'Pizza',
  description: 'Delicious',
  info: 'Italian',
  score: 5,
  duration: '30 min',
  ingredients: ['cheese', 'dough'],
};

describe('RecipeDetail', () => {
  const mockAddRating = jest.fn(() => ({}));
  beforeEach(() => {
    jest.clearAllMocks();
    (useAddRatingMutation as jest.Mock).mockReturnValue([mockAddRating]);
  });

  it('renders recipe details', () => {
    (useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
      data: mockRecipe,
      isLoading: false,
      error: null,
    });

    render(<RecipeDetail id="1" />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Delicious')).toBeInTheDocument();
    expect(screen.getByText('cheese')).toBeInTheDocument();
  });

  it('renders loader if isLoading', () => {
    (useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<RecipeDetail id="1" />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message if error', () => {
    (useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: '500', data: { message: 'Something bad happened' } },
    });

    render(<RecipeDetail id="1" />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Something bad happened');
  });

  it('submits rating with the correct score', () => {
    (useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
      data: mockRecipe,
      isLoading: false,
      error: null,
    });

    render(<RecipeDetail id="1" />);

    expect(screen.getByText('Ohodnoť tento recept')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('score-5'));

    expect(mockAddRating).toHaveBeenCalledWith({
      recipeId: '1',
      formData: {
        score: 5,
      },
    });
  });
});
