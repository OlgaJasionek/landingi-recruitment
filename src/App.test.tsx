import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders cart list component", () => {
  render(<App />);
  const cartListComponent = screen.getByRole(/CartList/i);
  expect(cartListComponent).toBeInTheDocument();
});
