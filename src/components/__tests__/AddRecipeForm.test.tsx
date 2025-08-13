import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddRecipeForm from '@/components/AddRecipeForm';
import { useAddRecipeMutation } from '@/lib/store/api';

jest.mock('@/lib/store/api', () => ({
  useAddRecipeMutation: jest.fn(),
}));

describe('AddRecipeForm', () => {
  const mockUnwrap = jest.fn().mockResolvedValue({ ok: true });
  const mockAddRecipe = jest.fn(() => ({
    unwrap: mockUnwrap,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    (useAddRecipeMutation as jest.Mock).mockReturnValue([mockAddRecipe]);
  });

  it('submits the form with valid data', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Název receptu'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postup'), {
      target: { value: 'Put in the oven' },
    });
    fireEvent.change(screen.getByPlaceholderText('Vaše ingredience'), {
      target: { value: 'Cheese' },
    });
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledWith({
        name: 'Pizza',
        info: 'Cheesy',
        description: 'Put in the oven',
        ingredients: ['Cheese'],
        duration: 30,
      });

      expect(mockUnwrap).toHaveBeenCalled();
    });
  });

  it('submits the form with multiple ingredients', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Název receptu'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postup'), {
      target: { value: 'Put in the oven' },
    });
    fireEvent.change(screen.getByPlaceholderText('Vaše ingredience'), {
      target: { value: 'Cheese' },
    });
    fireEvent.click(screen.getByTestId('add-ingredient-button'));
    fireEvent.change(screen.getAllByPlaceholderText('Vaše ingredience')[1], {
      target: { value: 'Peppers' },
    });
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledWith({
        name: 'Pizza',
        info: 'Cheesy',
        description: 'Put in the oven',
        ingredients: ['Cheese', 'Peppers'],
        duration: 30,
      });

      expect(mockUnwrap).toHaveBeenCalled();
    });
  });

  it('does not submit empty ingredients', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Název receptu'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postup'), {
      target: { value: 'Put in the oven' },
    });
    fireEvent.change(screen.getByPlaceholderText('Vaše ingredience'), {
      target: { value: 'Cheese' },
    });
    fireEvent.click(screen.getByTestId('add-ingredient-button'));
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledWith({
        name: 'Pizza',
        info: 'Cheesy',
        description: 'Put in the oven',
        ingredients: ['Cheese'],
        duration: 30,
      });

      expect(mockUnwrap).toHaveBeenCalled();
    });
  });

  it('does not submit the form if nan value is in duration', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Název receptu'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postup'), {
      target: { value: 'Put in the oven' },
    });
    fireEvent.change(screen.getByPlaceholderText('Vaše ingredience'), {
      target: { value: 'Cheese' },
    });
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 'not a number' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Čas musí mít číselnou hodnotu.')).toBeInTheDocument();
    });
    expect(mockAddRecipe).not.toHaveBeenCalled();
  });

  it('does not submit the form if name is missing', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postup'), {
      target: { value: 'Put in the oven' },
    });
    fireEvent.change(screen.getByPlaceholderText('Vaše ingredience'), {
      target: { value: 'Cheese' },
    });
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Recept nemůže být bez názvu.')).toBeInTheDocument();
    });
    expect(mockAddRecipe).not.toHaveBeenCalled();
  });

  it('does not submit the form if description is missing', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Název receptu'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Vaše ingredience'), {
      target: { value: 'Cheese' },
    });
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Recept nemůže být bez postupu.')).toBeInTheDocument();
    });
    expect(mockAddRecipe).not.toHaveBeenCalled();
  });

  it('does not submit the form if there are not any ingredients', async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByPlaceholderText('Název receptu'), {
      target: { value: 'Pizza' },
    });
    fireEvent.change(screen.getByPlaceholderText('Úvodní text'), {
      target: { value: 'Cheesy' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postup'), {
      target: { value: 'Put in the oven' },
    });
    fireEvent.change(screen.getByPlaceholderText('Čas'), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Musíte zadat alespoň jednu ingredienci.')).toBeInTheDocument();
    });
    expect(mockAddRecipe).not.toHaveBeenCalled();
  });
});
