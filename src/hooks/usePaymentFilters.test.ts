import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { INITIAL_PARAMS, usePaymentFilters } from "./usePaymentFilters";

describe("usePaymentFilters", () => {
	test("applies the search only on submit and goes back to page 1", () => {
		const { result } = renderHook(() => usePaymentFilters());

		act(() => result.current.changePage(3));
		act(() => result.current.setSearch("pay_134"));
		expect(result.current.params.search).toBeUndefined();

		act(() => result.current.applySearch());
		expect(result.current.params.search).toBe("pay_134");
		expect(result.current.params.page).toBe(1);
	});

	test("changing currency keeps the typed search", () => {
		const { result } = renderHook(() => usePaymentFilters());

		act(() => result.current.setSearch("pay_1"));
		act(() => result.current.changeCurrency("EUR"));

		expect(result.current.params.search).toBe("pay_1");
		expect(result.current.params.currency).toBe("EUR");
	});

	test("clearFilters resets everything", () => {
		const { result } = renderHook(() => usePaymentFilters());

		act(() => result.current.setSearch("pay_1"));
		act(() => result.current.changeCurrency("GBP"));
		act(() => result.current.clearFilters());

		expect(result.current.search).toBe("");
		expect(result.current.params).toEqual(INITIAL_PARAMS);
		expect(result.current.hasActiveFilters).toBe(false);
	});
});
