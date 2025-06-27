export type Variant = "default" | "primary" | "secondary" | "outline" | "ghost" | "link" | "icon" | "loading";
export type Size = "xs" | "sm" | "base" | "md" | "lg" | "xl";

export const variants: Record<Variant, string> = {
  default: "bg-background-alternative dark:bg-background-dark-alternative rounded-lg overflow-hidden shadow",
  primary: "bg-brand-primary dark:bg-brand-dark-primary rounded-lg overflow-hidden shadow",
  secondary: "bg-brand-secondary dark:bg-brand-dark-secondary rounded-lg overflow-hidden shadow",
  outline: "border border-brand-primary/20 dark:border-brand-dark-primary/20 bg-transparent rounded-lg overflow-hidden",
  ghost: "bg-transparent rounded-lg overflow-hidden",
  link: "",
  icon: "",
  loading: "",
};

export const variantText: Record<Variant, string> = {
  default: "text-white dark:text-black",
  primary: "text-white dark:text-black",
  secondary: "text-white dark:text-black font-bold",
  outline: "text-brand-primary dark:text-brand-dark-primary",
  ghost: "text-brand-primary dark:text-brand-dark-primary",
  link: "text-brand-primary underline dark:text-brand-dark-primary",
  icon: "text-brand-primary dark:text-brand-dark-primary",
  loading: "text-white dark:text-black",
};

export const variantPadding: Record<Size, string> = {
  xs: "py-1 px-2",
  sm: "py-1.5 px-3",
  base: "py-2 px-4",
  md: "py-2.5 px-5",
  lg: "py-3 px-6",
  xl: "py-4 px-8",
};

export const variantTextSize: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};
