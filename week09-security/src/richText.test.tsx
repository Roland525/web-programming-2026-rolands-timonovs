import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { renderRichText } from "./richText";

afterEach(cleanup);

it("shows user tags as plain text", () => {
  const text = "Hello <img alt='map'> world";
  const { container } = render(<p>{renderRichText(text)}</p>);
  expect(container.querySelector("img")).toBeNull();
  expect(container.textContent).toBe(text);
});

it("makes the marked word bold", () => {
  const { container } = render(<p>{renderRichText("This is **important**.")}</p>);
  expect(container.querySelector("strong")?.textContent).toBe("important");
  expect(container.textContent).toBe("This is important.");
});

it("puts a break between two lines", () => {
  const { container } = render(<p>{renderRichText("One\nTwo")}</p>);
  const br = container.querySelector("br");
  expect(br?.parentElement?.previousElementSibling?.textContent).toBe("One");
  expect(br?.nextSibling?.textContent).toBe("Two");
});

it("keeps ordinary text unchanged", () => {
  const { container } = render(<p>{renderRichText("Hello campus")}</p>);
  expect(container.textContent).toBe("Hello campus");
  expect(container.querySelector("strong, br")).toBeNull();
});

it("keeps unpaired stars in the text", () => {
  const { container } = render(<p>{renderRichText("a **b")}</p>);
  expect(container.textContent).toBe("a **b");
  expect(container.querySelector("strong")).toBeNull();
});
