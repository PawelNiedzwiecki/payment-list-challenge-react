import { describe, expect, test } from "vitest";
import { toErrorType } from "./usePayments";

const axiosError = (status?: number) => ({
	isAxiosError: true,
	response: status ? { status } : undefined,
});

describe("toErrorType", () => {
	test("404 is notFound", () => {
		expect(toErrorType(axiosError(404))).toBe("notFound");
	});

	test("500 is server", () => {
		expect(toErrorType(axiosError(500))).toBe("server");
	});

	test("401 and network errors are unknown", () => {
		expect(toErrorType(axiosError(401))).toBe("unknown");
		expect(toErrorType(axiosError())).toBe("unknown");
	});

	test("no error is undefined", () => {
		expect(toErrorType(null)).toBeUndefined();
	});
});
