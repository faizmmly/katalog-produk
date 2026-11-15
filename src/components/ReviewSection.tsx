import { useUserReviews } from "../hooks/useUserReviews";
import type { Review } from "../types/product";
import { formatDate } from "../utils/format";
import { ReviewForm } from "./ReviewForm";

interface ReviewSectionProps {
  productId: string;
  apiReviews: Review[];
}

export function ReviewSection({ productId, apiReviews }: ReviewSectionProps) {
  const { reviews: mine, add, remove } = useUserReviews(productId);
  const total = mine.length + apiReviews.length;

  return (
    <section className="reviews">
      <h2>Ulasan ({total})</h2>

      <ReviewForm onSubmit={add} />

      {total === 0 ? (
        <p className="muted">Belum ada ulasan. Jadilah yang pertama!</p>
      ) : (
        <ul>
          {mine.map((r) => (
            <li key={r.id} className="is-mine">
              <div className="review-top">
                <strong>{r.name}</strong>
                <span className="rating">{"★".repeat(r.rating)}</span>
                <span className="muted">{formatDate(r.date)} • Ulasan Anda</span>
                <button type="button" className="link-danger" onClick={() => remove(r.id)}>
                  Hapus
                </button>
              </div>
              <p>{r.comment}</p>
            </li>
          ))}
          {apiReviews.map((r) => (
            <li key={`${r.reviewerName}-${r.date}`}>
              <div className="review-top">
                <strong>{r.reviewerName}</strong>
                <span className="rating">{"★".repeat(r.rating)}</span>
                <span className="muted">{formatDate(r.date)}</span>
              </div>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}