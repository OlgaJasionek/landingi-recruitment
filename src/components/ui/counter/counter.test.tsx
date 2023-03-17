import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./counter.component";

const onChangeMockFn = jest.fn();

describe("Counter", () => {
  it("decrease button should be disabled when value is equel 1", async () => {
    const value = 1;
    render(<Counter value={value} onChange={onChangeMockFn} />);
    const decreasebtn = screen.getByRole("button", { name: /decreasebtn/i });
    expect(decreasebtn).toHaveAttribute("disabled");
  });

  it("should increase value when increase button was clicked", async () => {
    render(<Counter value={1} onChange={onChangeMockFn} />);
    const increaseBtn = screen.getByRole("button", { name: /increasebtn/i });
    fireEvent.click(increaseBtn);
    expect(onChangeMockFn).toBeCalledWith(2);
  });

  it("should decrease value when decrease button was clicked", async () => {
    render(<Counter value={5} onChange={onChangeMockFn} />);
    const decreaseBtn = screen.getByRole("button", { name: /decreasebtn/i });
    fireEvent.click(decreaseBtn);
    expect(onChangeMockFn).toBeCalledWith(4);
  });
});
