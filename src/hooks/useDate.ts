import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.locale("pt-br");

const DEFAULT_TIMEZONE = "America/Sao_Paulo" as const;

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export type DateFormatStyle =
  | "time24"
  | "time24Seconds"
  | "time12"
  | "time12Seconds"
  | "dateShort"
  | "dateMedium"
  | "dateLong"
  | "dateFull"
  | "usDateShort"
  | "usDateMedium"
  | "enDateLong"
  | "enDateFull"
  | "dateTimeShort"
  | "dateTimeMedium"
  | "dateTimeLong"
  | "enDateTimeLong"
  | "isoDate"
  | "isoDateTime"
  | "rfc2822"
  | "day"
  | "dayName"
  | "dayMonth"
  | "dayMonthName"
  | "month"
  | "monthNameShort"
  | "monthNameLong"
  | "monthYear"
  | "year"
  | "quarter"
  | "weekOfYear";

const DATE_FORMATS = {
  time24: "HH:mm",
  time24Seconds: "HH:mm:ss",
  time12: "hh:mm A",
  time12Seconds: "hh:mm:ss A",
  dateShort: "DD/MM/YY",
  dateMedium: "DD/MM/YYYY",
  dateLong: "DD [de] MMMM [de] YYYY",
  dateFull: "dddd, DD [de] MMMM [de] YYYY",
  usDateShort: "MM/DD/YY",
  usDateMedium: "MM/DD/YYYY",
  enDateLong: "MMMM D, YYYY",
  enDateFull: "dddd, MMMM D, YYYY",
  dateTimeShort: "DD/MM/YY HH:mm",
  dateTimeMedium: "DD/MM/YYYY [às] HH:mm",
  dateTimeLong: "DD [de] MMMM [de] YYYY [às] HH:mm",
  enDateTimeLong: "MMMM D, YYYY h:mm A",
  isoDate: "YYYY-MM-DD",
  isoDateTime: "YYYY-MM-DD[T]HH:mm:ssZ",
  rfc2822: "ddd, DD MMM YYYY HH:mm:ss ZZ",
  day: "DD",
  dayName: "dddd",
  dayMonth: "DD/MM",
  dayMonthName: "DD [de] MMMM",
  month: "MM",
  monthNameShort: "MMM",
  monthNameLong: "MMMM",
  monthYear: "MMMM/YYYY",
  year: "YYYY",
  quarter: "Qo [trimestre]",
  weekOfYear: "Wo [semana]",
} as const;

function formatDateTime(
  inputDate?: Date | string,
  style: DateFormatStyle = "dateMedium",
  tz: string = DEFAULT_TIMEZONE
): string {
  if (!inputDate) return "Data não informada";

  const date = typeof inputDate === "string" ? dayjs.tz(inputDate, tz) : dayjs(inputDate).tz(tz);

  if (!date.isValid()) {
    return `Data inválida: ${inputDate}`;
  }

  if (style === "isoDateTime") {
    return date.toISOString();
  }

  return capitalize(date.format(DATE_FORMATS[style]));
}

function getCurrentDateTimeISO(tz: string = DEFAULT_TIMEZONE): string {
  return dayjs().tz(tz).toISOString();
}

export function useDate(tz: string = DEFAULT_TIMEZONE) {
  return {
    formatDateTime: (date?: Date | string, style?: DateFormatStyle) => formatDateTime(date, style, tz),
    getCurrentDateTimeISO: () => getCurrentDateTimeISO(tz),
  };
}
