import { I18N } from "../constants/i18n";
import { usePaymentFilters } from "../hooks/usePaymentFilters";
import { usePayments } from "../hooks/usePayments";
import * as CSS from "./styles";
import { Pagination } from "./Pagination";
import { PaymentsEmpty } from "./PaymentsEmpty";
import { PaymentsError } from "./PaymentsError";
import { PaymentsSearch } from "./PaymentsSearch";
import { PaymentsTable } from "./PaymentsTable";

export const PaymentsPage = () => {
	const filters = usePaymentFilters();
	const {
		view,
		payments,
		page,
		isLastPage,
		isFetching,
		isPlaceholderData,
		errorType,
	} = usePayments(filters.params);

	const renderContent = () => {
		switch (view) {
			case "loading":
				return (
					<CSS.SpinnerWrapper>
						<CSS.Spinner role="img" aria-label={I18N.LOADING_PAYMENTS} />
					</CSS.SpinnerWrapper>
				);
			case "error":
				return <PaymentsError type={errorType} />;
			case "empty":
				return <PaymentsEmpty />;
			case "success":
				return (
					<PaymentsTable payments={payments} isBusy={isFetching}>
						<Pagination
							page={page}
							isLastPage={isLastPage}
							disabled={isPlaceholderData}
							onPageChange={filters.changePage}
						/>
					</PaymentsTable>
				);
		}
	};

	return (
		<CSS.Container>
			<CSS.Title>{I18N.PAGE_TITLE}</CSS.Title>
			<PaymentsSearch
				value={filters.search}
				onChange={filters.setSearch}
				onSearch={filters.applySearch}
				currency={filters.params.currency ?? ""}
				onCurrencyChange={filters.changeCurrency}
				onClear={filters.clearFilters}
				showClear={filters.hasActiveFilters}
			/>
			{renderContent()}
		</CSS.Container>
	);
};
