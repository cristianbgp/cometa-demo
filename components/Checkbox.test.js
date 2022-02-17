import Checkbox from "./Checkbox";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Checkbox", () => {
  it("should call onClick", () => {
    const onClick = jest.fn();
    render(<Checkbox onClick={onClick} />);
    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
