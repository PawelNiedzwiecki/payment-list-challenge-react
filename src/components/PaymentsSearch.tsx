import type { FormEvent } from "react";
import { CURRENCIES } from "../constants";
import { I18N } from "../constants/i18n";
import type { Currency } from "../types/payment";
import * as CSS from "./styles";

type PaymentsSearchProps = {
	value: string;
	onChange: (value: string) => void;
	currency: Currency | "";
	onCurrencyChange: (currency: Currency | "") => void;
	onSearch: () => void;
	onClear: () => void;
	showClear: boolean;
};

export const PaymentsSearch = ({
	value,
	onChange,
	currency,
	onCurrencyChange,
	onSearch,
	onClear,
	showClear,
}: PaymentsSearchProps) => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch();
	};

	return (
		<form role="search" onSubmit={handleSubmit}>
			<CSS.FilterRow>
				<CSS.SearchInput
					type="search"
					aria-label={I18N.SEARCH_LABEL}
					placeholder={I18N.SEARCH_PLACEHOLDER}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<CSS.Select
					aria-label={I18N.CURRENCY_FILTER_LABEL}
					value={currency}
					onChange={(e) => onCurrencyChange(e.target.value as Currency | "")}
				>
					<option value="">{I18N.CURRENCIES_OPTION}</option>
					{CURRENCIES.map((curr) => (
						<option key={curr} value={curr}>
							{curr}
						</option>
					))}
				</CSS.Select>
				<CSS.SearchButton type="submit">{I18N.SEARCH_BUTTON}</CSS.SearchButton>
				{showClear && (
					<CSS.ClearButton type="button" onClick={onClear}>
						{I18N.CLEAR_FILTERS}
					</CSS.ClearButton>
				)}
			</CSS.FilterRow>
		</form>
	);
};
