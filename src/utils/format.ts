import { format, parseISO } from "date-fns";

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatDate = (isoDate: string) =>
	format(parseISO(isoDate), "dd/MM/yyyy, HH:mm:ss");

export const formatAmount = (amount: number) => amount.toFixed(2);
