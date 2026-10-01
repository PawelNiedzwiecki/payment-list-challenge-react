import { I18N } from "../constants/i18n";
import * as CSS from "./styles";

type PaginationProps = {
	page: number;
	isLastPage: boolean;
	disabled?: boolean;
	onPageChange: (page: number) => void;
};

export const Pagination = ({
	page,
	isLastPage,
	disabled = false,
	onPageChange,
}: PaginationProps) => (
	<CSS.PaginationRow aria-label={I18N.PAGINATION_LABEL}>
		<CSS.PaginationButton
			disabled={disabled || page === 1}
			onClick={() => onPageChange(page - 1)}
		>
			{I18N.PREVIOUS_BUTTON}
		</CSS.PaginationButton>
		<span aria-live="polite" aria-atomic="true">
			{I18N.PAGE_LABEL} {page}
		</span>
		<CSS.PaginationButton
			disabled={disabled || isLastPage}
			onClick={() => onPageChange(page + 1)}
		>
			{I18N.NEXT_BUTTON}
		</CSS.PaginationButton>
	</CSS.PaginationRow>
);
