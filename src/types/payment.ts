import type { CURRENCIES } from "../constants";

export type Currency = (typeof CURRENCIES)[number];

export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

export interface Payment {
	id: string;
	customerName: string;
	customerAddress: string;
	amount: number;
	currency: Currency;
	status: PaymentStatus;
	date: string;
	description: string;
}

export interface PaymentSearchResponse {
	payments: Payment[];
	total: number;
	page: number;
	pageSize: number;
}

export interface PaymentSearchParams {
	search?: string;
	currency?: Currency;
	page?: number;
	pageSize?: number;
}

export type PaymentsErrorType = "notFound" | "server" | "unknown";
