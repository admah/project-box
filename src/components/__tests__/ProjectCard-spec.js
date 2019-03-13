import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import ProjectCard from "../ProjectCard";

describe("Project Card", () => {
  test("it renders the container", () => {
    const { container } = render(
      <ProjectCard
        id="123"
        name="TEST"
        description="This is a test."
        tags={[]}
      />
    );
    expect(container).toBeDefined();
  });
});
