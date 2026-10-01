import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { I18N } from "../constants/i18n";
import { usePayments } from "../hooks/usePayments";
import { PaymentsPage } from "./PaymentsPage";

vi.mock("../hooks/usePayments");

const result = {
	view: "success" as const,
	payments: [],
	page: 1,
	isLastPage: true,
	isFetching: false,
	isPlaceholderData: false,
	errorType: undefined,
};

describe("PaymentsPage", () => {
	test("shows the spinner while loading", () => {
		vi.mocked(usePayments).mockReturnValue({ ...result, view: "loading" });
		render(<PaymentsPage />);

		expect(screen.getByLabelText(I18N.LOADING_PAYMENTS)).toBeInTheDocument();
		expect(screen.queryByRole("table")).not.toBeInTheDocument();
	});

	test("shows the error instead of the table", () => {
		vi.mocked(usePayments).mockReturnValue({
			...result,
			view: "error",
			errorType: "notFound",
		});
		render(<PaymentsPage />);

		expect(screen.getByText(I18N.PAYMENT_NOT_FOUND)).toBeInTheDocument();
		expect(screen.queryByRole("table")).not.toBeInTheDocument();
	});

	test("shows the table and pagination on success", () => {
		vi.mocked(usePayments).mockReturnValue(result);
		render(<PaymentsPage />);

		expect(screen.getByRole("table")).toBeInTheDocument();
		expect(screen.getByText(`${I18N.PAGE_LABEL} 1`)).toBeInTheDocument();
	});
});
