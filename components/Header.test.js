import { render, screen } from "@testing-library/react";
import { studentResponse } from "../utils/mockDataResponses";
import Header from "./Header";

const student = studentResponse;

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header school={student.school} />);
    expect(screen.getByText(student.school.name)).toBeInTheDocument();
  });
});
