import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import Home from "../Home";

describe("Home", () => {
  test("it renders the container", () => {
    const { container } = render(<Home />);
    expect(container).toBeDefined();
  });
});
