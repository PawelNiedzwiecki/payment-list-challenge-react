import { I18N } from "../constants/i18n";
import type { PaymentsErrorType } from "../types/payment";
import * as CSS from "./styles";

const ERROR_MESSAGES: Record<PaymentsErrorType, string> = {
	notFound: I18N.PAYMENT_NOT_FOUND,
	server: I18N.INTERNAL_SERVER_ERROR,
	unknown: I18N.SOMETHING_WENT_WRONG,
};

type PaymentsErrorProps = {
	type?: PaymentsErrorType;
};

export const PaymentsError = ({ type }: PaymentsErrorProps) => {
	if (!type) {
		return null;
	}

	return <CSS.ErrorBox role="alert">{ERROR_MESSAGES[type]}</CSS.ErrorBox>;
};
