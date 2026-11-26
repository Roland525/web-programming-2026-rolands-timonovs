import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import ProjectFilters from "./ProjectFilters";

afterEach(cleanup);

it("marks only Active as pressed", () => {
  render(<ProjectFilters current="active" onChange={vi.fn()} />);
  expect(screen.getByRole("button", { name: "Active" }).getAttribute("aria-pressed")).toBe("true");
  expect(screen.getByRole("button", { name: "All" }).getAttribute("aria-pressed")).toBe("false");
});

it("selects Done when clicked", async () => {
  const onChange = vi.fn();
  render(<ProjectFilters current="all" onChange={onChange} />);
  await userEvent.click(screen.getByRole("button", { name: "Done" }));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith("done");
});
