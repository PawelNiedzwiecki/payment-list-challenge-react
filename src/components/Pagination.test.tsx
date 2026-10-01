import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { I18N } from "../constants/i18n";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
	test("disables Previous on the first page", () => {
		render(<Pagination page={1} isLastPage={false} onPageChange={vi.fn()} />);

		expect(screen.getByText(I18N.PREVIOUS_BUTTON)).toBeDisabled();
		expect(screen.getByText(I18N.NEXT_BUTTON)).toBeEnabled();
	});

	test("disables Next on the last page", () => {
		render(<Pagination page={2} isLastPage onPageChange={vi.fn()} />);

		expect(screen.getByText(I18N.NEXT_BUTTON)).toBeDisabled();
	});

	test("changes page on click", () => {
		const onPageChange = vi.fn();
		render(
			<Pagination page={2} isLastPage={false} onPageChange={onPageChange} />,
		);

		fireEvent.click(screen.getByText(I18N.NEXT_BUTTON));
		expect(onPageChange).toHaveBeenCalledWith(3);

		fireEvent.click(screen.getByText(I18N.PREVIOUS_BUTTON));
		expect(onPageChange).toHaveBeenCalledWith(1);
	});
});
