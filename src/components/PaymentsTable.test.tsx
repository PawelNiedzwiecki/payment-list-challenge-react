import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { I18N } from "../constants/i18n";
import type { Payment } from "../types/payment";
import { PaymentsTable } from "./PaymentsTable";

const payment: Payment = {
	id: "pay_134_1",
	customerName: "John Doe",
	customerAddress: "101 Green St, Springfield, USA",
	amount: 250,
	currency: "USD",
	status: "completed",
	date: "2024-01-05T09:03:07Z",
	description: "Test payment",
};

describe("PaymentsTable", () => {
	test("shows a formatted row for each payment", () => {
		render(<PaymentsTable payments={[payment]} />);

		expect(screen.getByText("pay_134_1")).toBeInTheDocument();
		expect(screen.getByText("05/01/2024, 09:03:07")).toBeInTheDocument();
		expect(screen.getByText("250.00")).toBeInTheDocument();
		expect(screen.getByText("Completed")).toBeInTheDocument();
	});

	test("shows a dash when the customer name is missing", () => {
		render(<PaymentsTable payments={[{ ...payment, customerName: "" }]} />);

		expect(screen.getByText(I18N.EMPTY_CUSTOMER)).toBeInTheDocument();
	});
});
