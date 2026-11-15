export const formatPrice = (n: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const formatCategory = (slug: string): string => slug.replace(/-/g, " ");

// Tambahkan formatDate di sini agar bisa diimpor oleh ReviewSection atau komponen lain
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};