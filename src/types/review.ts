export interface UserReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string; // ISO
}

export interface ReviewFormValues {
  name: string;
  rating: number;
  comment: string;
}

export type ReviewErrors = Partial<Record<keyof ReviewFormValues, string>>;