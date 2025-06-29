export type Variant = "default" | "primary" | "secondary" | "outline" | "ghost" | "link" | "icon" | "loading";
export type Size = "xs" | "sm" | "base" | "md" | "lg" | "xl";

export const variants: Record<Variant, string> = {
  default: "bg-background-alternative dark:bg-background-dark-alternative rounded-lg overflow-hidden shadow",
  primary: "bg-highlight-primary dark:bg-highlight-dark-primary rounded-lg overflow-hidden shadow",
  secondary: "bg-highlight-secondary dark:bg-highlight-dark-secondary rounded-lg overflow-hidden shadow",
  outline: "border border-gray-300 bg-transparent rounded-lg overflow-hidden",
  ghost: "bg-transparent rounded-lg overflow-hidden",
  link: "",
  icon: "",
  loading: "",
};

export const variantText: Record<Variant, string> = {
  default: "text-white",
  primary: "text-white dark:text-black",
  secondary: "text-black",
  outline: "text-highlight-primary dark:text-highlight-dark-primary",
  ghost: "text-highlight-primary dark:text-highlight-dark-primary",
  link: "text-highlight-primary underline dark:text-highlight-dark-primary",
  icon: "text-highlight-primary dark:text-highlight-dark-primary",
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
