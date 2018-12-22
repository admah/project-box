import React from "react";
import { cleanup, render } from "react-testing-library";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "jest-dom/extend-expect";
import Nav from "../Nav";
import { onAwsLogout } from "../../actions/AccountActions";

afterEach(cleanup);

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

describe("Nav", () => {
  test("it renders the container", () => {
    const props = {
      history: {},
      user: {},
      onAwsLogout: () => null
    };
    const route = "/";
    const { container } = renderWithRouter(<Nav {...props} />, { route });
    expect(container).toBeDefined();
  });
});
