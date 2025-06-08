import { useMemo } from "react";

type FormatType = "short" | "long" | "datetime";
type Locale = "pt-BR" | "en-US";

export function useFormattedDate() {
  const formatDate = (isoDate: string, format: FormatType = "short", locale: Locale = "pt-BR") => {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = useMemo(() => {
      switch (format) {
        case "long":
          return { year: "numeric", month: "long", day: "numeric" };
        case "datetime":
          return { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
        case "short":
        default:
          return { year: "numeric", month: "2-digit", day: "2-digit" };
      }
    }, [format]);

    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return { formatDate };
}
