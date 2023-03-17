import { render, screen } from "@testing-library/react";
import Button from "./button.component";

it("should render same text passed into text prop", async () => {
  const text = "button text";
  render(<Button text={text} onClick={() => {}} theme='contained' />);
  const btn = screen.getByText(/button text/i);
  expect(btn).toBeInTheDocument();
});
