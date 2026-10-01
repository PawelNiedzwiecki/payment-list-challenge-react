import { I18N } from "../constants/i18n";
import * as CSS from "./styles";

export const PaymentsEmpty = () => (
	<CSS.EmptyBox role="status">{I18N.NO_PAYMENTS_FOUND}</CSS.EmptyBox>
);
