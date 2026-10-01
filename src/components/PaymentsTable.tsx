import type { ReactNode } from "react";
import { I18N } from "../constants/i18n";
import type { Payment } from "../types/payment";
import { capitalise, formatAmount, formatDate } from "../utils/format";
import * as CSS from "./styles";

const HEADERS = [
	I18N.TABLE_HEADER_PAYMENT_ID,
	I18N.TABLE_HEADER_DATE,
	I18N.TABLE_HEADER_AMOUNT,
	I18N.TABLE_HEADER_CUSTOMER,
	I18N.TABLE_HEADER_CURRENCY,
	I18N.TABLE_HEADER_STATUS,
];

type PaymentsTableProps = {
	payments: Payment[];
	isBusy?: boolean;
	children?: ReactNode;
};

export const PaymentsTable = ({
	payments,
	isBusy = false,
	children,
}: PaymentsTableProps) => (
	<CSS.TableWrapper aria-busy={isBusy} $isBusy={isBusy}>
		<CSS.Table aria-label={I18N.PAGE_TITLE}>
			<CSS.TableHeaderWrapper>
				<CSS.TableHeaderRow>
					{HEADERS.map((header) => (
						<CSS.TableHeader key={header} scope="col">
							{header}
						</CSS.TableHeader>
					))}
				</CSS.TableHeaderRow>
			</CSS.TableHeaderWrapper>
			<CSS.TableBodyWrapper>
				{payments.map((payment) => (
					<CSS.TableRow key={payment.id}>
						<CSS.TableCell>{payment.id}</CSS.TableCell>
						<CSS.TableCell>{formatDate(payment.date)}</CSS.TableCell>
						<CSS.TableCell>{formatAmount(payment.amount)}</CSS.TableCell>
						<CSS.TableCell>
							{payment.customerName || I18N.EMPTY_CUSTOMER}
						</CSS.TableCell>
						<CSS.TableCell>
							{payment.currency || I18N.EMPTY_CURRENCY}
						</CSS.TableCell>
						<CSS.TableCell>
							<CSS.StatusBadge $status={payment.status}>
								{capitalise(payment.status)}
							</CSS.StatusBadge>
						</CSS.TableCell>
					</CSS.TableRow>
				))}
			</CSS.TableBodyWrapper>
		</CSS.Table>
		{children}
	</CSS.TableWrapper>
);
