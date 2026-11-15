export const formatPrice = (n: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const formatCategory = (slug: string): string => slug.replace(/-/g, " ");