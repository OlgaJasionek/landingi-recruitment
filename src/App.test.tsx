import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders cart list component", async () => {
  render(<App />);
  const cartListElement = screen.getByText(/dodaj nowy koszyk/i);
  expect(cartListElement).toBeInTheDocument();
});
