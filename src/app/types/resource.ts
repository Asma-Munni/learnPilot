export type ResourceType = "course" | "tutorial" | "article" | "guide";
export type ResourceLevel = "beginner" | "intermediate" | "advanced";
export type ResourceStatus = "draft" | "published";

export interface LearningResource {
  resourceId: string;
  ownerId: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category: string;
  resourceType: ResourceType;
  level: ResourceLevel;
  estimatedMinutes: number;
  averageRating: number;
  ratingCount: number;
  publishedAt: string; // ISO String format
  tags: string[];
  status: ResourceStatus;
  
  // Extended fields
  learningOutcomes?: string[];
  prerequisites?: string[];
  instructorName?: string;
  instructorImage?: string;
  galleryImages?: string[];
  language?: string;
  certificateAvailable?: boolean;
}

export const ALLOWED_CATEGORIES = [
  "Web Development",
  "AI & Machine Learning",
  "Design & CSS",
  "Backend Development",
  "Data Science",
  "DevOps",
  "Cyber Security",
] as const;

export type CategoryType = typeof ALLOWED_CATEGORIES[number];
