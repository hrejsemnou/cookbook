import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddRecipeForm from "@/components/AddRecipeForm";
import { useAddRecipeMutation } from "@/lib/store/api";

jest.mock("@/lib/store/api", () => ({
  useAddRecipeMutation: jest.fn(),
}));

describe("AddRecipeForm", () => {
  const mockUnwrap = jest.fn().mockResolvedValue({ ok: true });
  const mockAddRecipe = jest.fn(() => ({
    unwrap: mockUnwrap,
  }));

  beforeEach(() => {
    (useAddRecipeMutation as jest.Mock).mockReturnValue([mockAddRecipe]);
  });

  it("submits the form with valid data", async () => {
    render(<AddRecipeForm />);

    fireEvent.change(screen.getByLabelText(/Název/i), {
      target: { value: "Pizza" },
    });
    fireEvent.change(screen.getByLabelText(/Popis/i), {
      target: { value: "Cheesy" },
    });
    fireEvent.change(screen.getByLabelText(/Info/i), {
      target: { value: "Fast food" },
    });
    fireEvent.change(screen.getByLabelText(/Ingredience/i), {
      target: { value: "Cheese" },
    });
    fireEvent.change(screen.getByLabelText(/Délka/i), {
      target: { value: "30" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Přidat recept/i }));

    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledWith({
        name: "Pizza",
        description: "Cheesy",
        info: "Fast food",
        ingredients: ["Cheese"],
        duration: "30",
      });

      expect(mockUnwrap).toHaveBeenCalled();
    });
  });
});
