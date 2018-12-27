import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import Materials from "../Materials";

describe("Materials", () => {
  test("it renders the container", () => {
    const { container } = render(<Materials user={{}} />);
    expect(container).toBeDefined();
  });
});
