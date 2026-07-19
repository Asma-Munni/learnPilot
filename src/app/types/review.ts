export interface Review {
  reviewId: string;
  resourceId: string;
  reviewerName: string;
  reviewerImage: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO date string
}
