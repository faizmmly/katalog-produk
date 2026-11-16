import { useUserReviews } from "../hooks/useUserReviews";
import type { Review } from "../types/product";
import { formatDate } from "../utils/format";
import { ReviewForm } from "./ReviewForm";
import { User, Star } from "lucide-react"; // 👈 Import ikon Lucide

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
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          
          {/* Ulasan Buatan Pengguna (Lokal) */}
          {mine.map((r) => (
            <li key={r.id} className="is-mine" style={{ padding: "16px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div className="review-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                
                {/* Nama dengan Ikon User */}
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
                  <User size={16} className="muted" />
                  {r.name} <span className="muted" style={{ fontSize: "0.8rem", fontWeight: "normal" }}>(Ulasan Anda)</span>
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Rating Bintang Lucide */}
                  <span className="rating" style={{ display: "inline-flex", alignItems: "center", gap: "2px", color: "#f59e0b" }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </span>
                  
                  <span className="muted" style={{ fontSize: "0.8rem" }}>{formatDate(r.date)}</span>
                  
                  <button type="button" className="link-danger" onClick={() => remove(r.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444", fontSize: "0.85rem" }}>
                    Hapus
                  </button>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "0.95rem" }} className="muted">{r.comment}</p>
            </li>
          ))}

          {/* Ulasan dari API */}
          {apiReviews.map((r) => (
            <li key={`${r.reviewerName}-${r.date}`} style={{ padding: "16px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <div className="review-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                
                {/* Nama dengan Ikon User */}
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
                  <User size={16} className="muted" />
                  {r.reviewerName}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Rating Bintang Lucide */}
                  <span className="rating" style={{ display: "inline-flex", alignItems: "center", gap: "2px", color: "#f59e0b" }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </span>
                  
                  <span className="muted" style={{ fontSize: "0.8rem" }}>{formatDate(r.date)}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "0.95rem" }} className="muted">{r.comment}</p>
            </li>
          ))}

        </ul>
      )}
    </section>
  );
}