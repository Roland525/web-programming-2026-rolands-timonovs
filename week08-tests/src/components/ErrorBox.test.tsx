import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { ErrorBox } from "./StateBox";

afterEach(cleanup);

it("shows the error message", () => {
  render(<ErrorBox message="Could not load projects" onRetry={vi.fn()} />);
  expect(screen.getByRole("alert").textContent).toContain("Could not load projects");
});

it("tries again once", async () => {
  const onRetry = vi.fn();
  render(<ErrorBox message="Could not load projects" onRetry={onRetry} />);
  await userEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(onRetry).toHaveBeenCalledTimes(1);
});
