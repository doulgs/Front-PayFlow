import { useCallback } from "react";

type UseCurrencyOptions = {
  locale?: string;
  currency?: string;
};

export function useCurrency(options?: UseCurrencyOptions) {
  const { locale = "pt-BR", currency = "BRL" } = options || {};

  const formatCurrency = useCallback(
    (value: number | string) => {
      const numericValue = typeof value === "string" ? Number(value.replace(/[^0-9.-]+/g, "")) : value;

      if (isNaN(numericValue))
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(0);

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(numericValue);
    },
    [locale, currency]
  );

  return { formatCurrency };
}
