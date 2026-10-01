import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { I18N } from "../constants/i18n";
import { PaymentsSearch } from "./PaymentsSearch";

describe("PaymentsSearch", () => {
	test("submits the search and changes currency", () => {
		const onSearch = vi.fn();
		const onCurrencyChange = vi.fn();
		render(
			<PaymentsSearch
				value="pay_134"
				onChange={vi.fn()}
				currency=""
				onCurrencyChange={onCurrencyChange}
				onSearch={onSearch}
				onClear={vi.fn()}
				showClear={false}
			/>,
		);

		fireEvent.click(screen.getByText(I18N.SEARCH_BUTTON));
		expect(onSearch).toHaveBeenCalled();

		fireEvent.change(screen.getByLabelText(I18N.CURRENCY_FILTER_LABEL), {
			target: { value: "EUR" },
		});
		expect(onCurrencyChange).toHaveBeenCalledWith("EUR");

		expect(screen.queryByText(I18N.CLEAR_FILTERS)).not.toBeInTheDocument();
	});

	test("shows Clear Filters when a filter is active", () => {
		const onClear = vi.fn();
		render(
			<PaymentsSearch
				value=""
				onChange={vi.fn()}
				currency="USD"
				onCurrencyChange={vi.fn()}
				onSearch={vi.fn()}
				onClear={onClear}
				showClear
			/>,
		);

		fireEvent.click(screen.getByText(I18N.CLEAR_FILTERS));
		expect(onClear).toHaveBeenCalled();
	});
});
