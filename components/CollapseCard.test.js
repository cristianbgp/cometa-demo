import { render, screen } from "@testing-library/react";
import CollapseCard from "./CollapseCard";
import userEvent from "@testing-library/user-event";

describe("CollapseCard", () => {
  it("should render correctly", () => {
    render(
      <CollapseCard title="This is a title">
        <p>This is a paragraph</p>
      </CollapseCard>
    );
    expect(screen.getByText("This is a title")).toBeInTheDocument();
    expect(screen.queryByText("This is a paragraph")).not.toBeInTheDocument();
  });

  it("should show children content after click", () => {
    render(
      <CollapseCard title="This is a title" subTitle="This is a subtitle">
        <p>This is a paragraph</p>
      </CollapseCard>
    );
    expect(screen.queryByText("This is a paragraph")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a subtitle")).toBeInTheDocument();
    userEvent.click(screen.getByText("This is a title"));
    expect(screen.queryByText("This is a paragraph")).toBeInTheDocument();
    expect(screen.queryByText("This is a subtitle")).not.toBeInTheDocument();
  });

  it("should show leftContent and rightContent if present", () => {
    render(
      <CollapseCard
        title="This is a title"
        leftContent={<span>Left content</span>}
        rightContent={<span>Right content</span>}
      >
        <p>This is a paragraph</p>
      </CollapseCard>
    );
    expect(screen.queryByText("Left content")).toBeInTheDocument();
    expect(screen.queryByText("Right content")).toBeInTheDocument();
  });
});
