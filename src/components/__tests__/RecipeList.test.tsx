import { render, screen } from '@testing-library/react';
import { RecipeList } from '@/components/RecipeList';
import { useGetRecipesQuery } from '@/lib/store/api';

jest.mock('@/lib/store/api', () => ({
  useGetRecipesQuery: jest.fn(),
}));

const mockRecipes = [
  { id: '1', name: 'Pizza' },
  { id: '2', name: 'Pasta' },
];

describe('RecipeList', () => {
  it('renders list of recipes', () => {
    (useGetRecipesQuery as jest.Mock).mockReturnValue({
      data: mockRecipes,
      isLoading: false,
      error: null,
    });

    render(<RecipeList />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  it('renders loader if isLoading', () => {
    (useGetRecipesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<RecipeList />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message if error', () => {
    (useGetRecipesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: '500', data: { message: 'Something bad happened' } },
    });

    render(<RecipeList />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Something bad happened');
  });
});
