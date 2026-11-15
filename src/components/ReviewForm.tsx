import { useState } from "react";
import type { FormEvent } from "react";
import type { ReviewErrors, ReviewFormValues } from "../types/review";
import { COMMENT_MAX, validateReview } from "../utils/validateReview";

interface ReviewFormProps {
  onSubmit: (values: ReviewFormValues) => void;
}

const EMPTY: ReviewFormValues = { name: "", rating: 0, comment: "" };

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [values, setValues] = useState<ReviewFormValues>(EMPTY); // form state
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [sent, setSent] = useState(false);

  const change = <K extends keyof ReviewFormValues>(key: K, value: ReviewFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined })); // hapus pesan saat diperbaiki
    setSent(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateReview(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit(values);
    setValues(EMPTY);
    setSent(true);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <h3>Tulis ulasan</h3>

      <div className="field">
        <label htmlFor="rv-name">Nama</label>
        <input
          id="rv-name"
          value={values.name}
          onChange={(e) => change("name", e.target.value)}
          autoComplete="name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="field">
        <span className="label" id="rv-rating-label">Rating</span>
        <div className="stars" role="group" aria-labelledby="rv-rating-label">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={n <= values.rating ? "is-on" : ""}
              aria-label={`${n} bintang`}
              aria-pressed={n === values.rating}
              onClick={() => change("rating", n)}
            >
              ★
            </button>
          ))}
        </div>
        {errors.rating && <p className="error">{errors.rating}</p>}
      </div>

      <div className="field">
        <label htmlFor="rv-comment">Komentar</label>
        <textarea
          id="rv-comment"
          rows={4}
          value={values.comment}
          onChange={(e) => change("comment", e.target.value)}
          aria-invalid={!!errors.comment}
        />
        <div className="field-foot">
          {errors.comment ? <p className="error">{errors.comment}</p> : <span />}
          <span className="muted counter">{values.comment.trim().length}/{COMMENT_MAX}</span>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Kirim ulasan</button>
      {sent && <p className="success" role="status">Ulasan terkirim. Terima kasih!</p>}
    </form>
  );
}