import { useMemo } from "react";

type FormatType = "short" | "long" | "datetime" | "time" | "weekday-short" | "weekday-long" | "month-year";

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
        case "time":
          return { hour: "2-digit", minute: "2-digit" };
        case "weekday-short":
          return { weekday: "short", day: "2-digit", month: "2-digit" };
        case "weekday-long":
          return { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        case "month-year":
          return { year: "numeric", month: "long" };
        case "short":
        default:
          return { year: "numeric", month: "2-digit", day: "2-digit" };
      }
    }, [format]);

    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return { formatDate };
}
