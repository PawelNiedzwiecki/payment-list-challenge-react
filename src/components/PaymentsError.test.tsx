import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { I18N } from "../constants/i18n";
import { PaymentsError } from "./PaymentsError";

describe("PaymentsError", () => {
	test("shows the message for the error type", () => {
		render(<PaymentsError type="server" />);

		expect(screen.getByRole("alert")).toHaveTextContent(
			I18N.INTERNAL_SERVER_ERROR,
		);
	});

	test("shows nothing without an error", () => {
		render(<PaymentsError />);

		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});
});
