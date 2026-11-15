import { useLocalStorage } from "./useLocalStorage";
import type { ReviewFormValues, UserReview } from "../types/review";

export function useUserReviews(productId: string) {
  const [reviews, setReviews] = useLocalStorage<UserReview[]>(`katalog-reviews-${productId}`, []);

  const add = (values: ReviewFormValues) =>
    setReviews([
      {
        id: Date.now(),
        name: values.name.trim(),
        rating: values.rating,
        comment: values.comment.trim(),
        date: new Date().toISOString(),
      },
      ...reviews,
    ]);

  const remove = (id: number) => setReviews(reviews.filter((r) => r.id !== id));

  return { reviews, add, remove };
}