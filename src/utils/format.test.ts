import { describe, expect, test } from "vitest";
import { capitalise, formatAmount, formatDate } from "./format";

describe("format", () => {
	test("formatDate", () => {
		expect(formatDate("2024-01-05T09:03:07Z")).toBe("05/01/2024, 09:03:07");
	});

	test("formatAmount", () => {
		expect(formatAmount(150)).toBe("150.00");
		expect(formatAmount(120.5)).toBe("120.50");
	});

	test("capitalise", () => {
		expect(capitalise("completed")).toBe("Completed");
	});
});
