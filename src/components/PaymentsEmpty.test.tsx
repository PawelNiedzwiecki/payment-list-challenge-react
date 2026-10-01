import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { I18N } from "../constants/i18n";
import { PaymentsEmpty } from "./PaymentsEmpty";

describe("PaymentsEmpty", () => {
	test("shows the empty message", () => {
		render(<PaymentsEmpty />);

		expect(screen.getByText(I18N.NO_PAYMENTS_FOUND)).toBeInTheDocument();
	});
});
