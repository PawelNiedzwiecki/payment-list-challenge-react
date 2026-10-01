import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { fetchPayments } from "../api/payments";
import type { PaymentSearchParams, PaymentsErrorType } from "../types/payment";

export const toErrorType = (error: unknown): PaymentsErrorType | undefined => {
	if (!error) {
		return undefined;
	}
	const status = isAxiosError(error) ? error.response?.status : undefined;
	if (status === undefined) {
		return "unknown";
	}
	if (status === 404) {
		return "notFound";
	}
	if (status >= 500) {
		return "server";
	}
	return "unknown";
};

export type PaymentsView = "loading" | "error" | "empty" | "success";

export const usePayments = (params: PaymentSearchParams) => {
	const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery({
		queryKey: ["payments", params],
		queryFn: ({ signal }) => fetchPayments(params, signal),
		placeholderData: keepPreviousData,
	});

	const payments = data?.payments ?? [];
	const errorType = toErrorType(error);

	let view: PaymentsView = "success";
	if (isLoading) {
		view = "loading";
	} else if (errorType) {
		view = "error";
	} else if (payments.length === 0) {
		view = "empty";
	}

	return {
		view,
		payments,
		page: data?.page ?? 1,
		isLastPage: !data || data.page * data.pageSize >= data.total,
		isFetching,
		isPlaceholderData,
		errorType,
	};
};
