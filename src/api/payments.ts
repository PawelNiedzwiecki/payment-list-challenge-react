import axios from "axios";
import { API_URL, PAGE_SIZE } from "../constants";
import type {
	PaymentSearchParams,
	PaymentSearchResponse,
} from "../types/payment";

export const fetchPayments = async (
	params: PaymentSearchParams,
	signal?: AbortSignal,
): Promise<PaymentSearchResponse> => {
	const { data } = await axios.get<PaymentSearchResponse>(API_URL, {
		params: {
			search: params.search || undefined,
			currency: params.currency || undefined,
			page: params.page ?? 1,
			pageSize: params.pageSize ?? PAGE_SIZE,
		},
		signal,
	});

	return data;
};
