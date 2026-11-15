import type { ReviewErrors, ReviewFormValues } from "../types/review";

export const COMMENT_MAX = 300;

export function validateReview(v: ReviewFormValues): ReviewErrors {
  const errors: ReviewErrors = {};
  if (v.name.trim().length < 2) errors.name = "Nama minimal 2 karakter.";
  if (v.rating < 1 || v.rating > 5) errors.rating = "Pilih rating 1 sampai 5.";

  const len = v.comment.trim().length;
  if (len < 10) errors.comment = "Komentar minimal 10 karakter.";
  else if (len > COMMENT_MAX) errors.comment = `Komentar maksimal ${COMMENT_MAX} karakter.`;

  return errors;
}