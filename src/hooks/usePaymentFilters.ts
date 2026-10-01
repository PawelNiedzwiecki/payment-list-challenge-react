import { useState } from "react";
import { PAGE_SIZE } from "../constants";
import type { Currency, PaymentSearchParams } from "../types/payment";

export const INITIAL_PARAMS: PaymentSearchParams = {
	page: 1,
	pageSize: PAGE_SIZE,
};

export const usePaymentFilters = () => {
	// Draft text in the search input; only copied into params on submit
	// or when the currency changes.
	const [search, setSearch] = useState("");
	const [params, setParams] = useState<PaymentSearchParams>(INITIAL_PARAMS);

	const applySearch = () => {
		setParams((prev) => ({
			...prev,
			search: search.trim() || undefined,
			page: 1,
		}));
	};

	// Applies immediately, and takes the current search text with it so an
	// unsubmitted search is not silently dropped.
	const changeCurrency = (currency: Currency | "") => {
		setParams((prev) => ({
			...prev,
			search: search.trim() || undefined,
			currency: currency || undefined,
			page: 1,
		}));
	};

	const changePage = (page: number) => {
		setParams((prev) => ({ ...prev, page }));
	};

	const clearFilters = () => {
		setSearch("");
		setParams(INITIAL_PARAMS);
	};

	const hasActiveFilters = Boolean(params.search || params.currency);

	return {
		search,
		setSearch,
		params,
		applySearch,
		changeCurrency,
		changePage,
		clearFilters,
		hasActiveFilters,
	};
};
