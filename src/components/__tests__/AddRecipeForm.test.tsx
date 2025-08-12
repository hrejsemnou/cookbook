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

    fireEvent.change(screen.getByPlaceholderText("Název receptu"), {
      target: { value: "Pizza" },
    });
    fireEvent.change(screen.getByPlaceholderText("Úvodní text"), {
      target: { value: "Cheesy" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postup"), {
      target: { value: "Put in the oven" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingredience"), {
      target: { value: "Cheese" },
    });
    fireEvent.change(screen.getByPlaceholderText("Čas"), {
      target: { value: 30 },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockAddRecipe).toHaveBeenCalledWith({
        name: "Pizza",
        info: "Cheesy",
        description: "Put in the oven",
        ingredients: ["Cheese"],
        duration: 30,
      });

      expect(mockUnwrap).toHaveBeenCalled();
    });
  });
});
