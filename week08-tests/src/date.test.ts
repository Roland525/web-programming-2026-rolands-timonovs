import { expect, it } from "vitest";
import { daysUntil } from "./date";

const today = new Date(2026, 10, 16);

it.each([
  ["2026-11-16", 0],
  ["2026-11-20", 4],
  ["2026-11-14", -2],
  ["2026-12-01", 15],
])("counts days until %s", (date, days) => {
  expect(daysUntil(date, today)).toBe(days);
});

it("counts tomorrow as one day even late at night", () => {
  expect(daysUntil("2026-11-17", new Date(2026, 10, 16, 23, 59))).toBe(1);
});
