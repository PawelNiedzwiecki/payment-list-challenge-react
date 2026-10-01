import axios from "axios";
import { afterEach, describe, expect, test, vi } from "vitest";
import { API_URL } from "../constants";
import { fetchPayments } from "./payments";

describe("fetchPayments", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("sends the filters as query params", async () => {
		const get = vi.spyOn(axios, "get").mockResolvedValue({ data: {} });

		await fetchPayments({ search: "pay_134", currency: "USD", page: 2 });

		expect(get).toHaveBeenCalledWith(API_URL, {
			params: { search: "pay_134", currency: "USD", page: 2, pageSize: 5 },
			signal: undefined,
		});
	});

	test("does not send empty filters", async () => {
		const get = vi.spyOn(axios, "get").mockResolvedValue({ data: {} });

		await fetchPayments({ search: "" });

		expect(get).toHaveBeenCalledWith(API_URL, {
			params: { search: undefined, currency: undefined, page: 1, pageSize: 5 },
			signal: undefined,
		});
	});
});
