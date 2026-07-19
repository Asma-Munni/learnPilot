import { Review } from "@/app/types/review";

export const mockReviews: Review[] = [
  {
    reviewId: "rev_001",
    resourceId: "res_001",
    reviewerName: "John Doe",
    reviewerImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "This course is spectacular! The sections on Server Actions and partial pre-rendering (PPR) resolved so many performance bottlenecks I was struggling with in Next.js. Dr. Jenkins breaks down complex React concepts beautifully.",
    createdAt: "2026-06-20T10:30:00Z"
  },
  {
    reviewId: "rev_002",
    resourceId: "res_001",
    reviewerName: "Clara Smith",
    reviewerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    rating: 4,
    comment: "Excellent technical depth. I really appreciated the real-world setup examples instead of just showing basic syntax. Docked one star only because the layout configurations took a bit of trial and error.",
    createdAt: "2026-06-25T14:15:00Z"
  },
  {
    reviewId: "rev_003",
    resourceId: "res_001",
    reviewerName: "David Lee",
    reviewerImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "Absolutely worth it. The section on caching boundary invalidation is the best explanation I've found on the web. Dr. Sarah Jenkins is incredibly clear.",
    createdAt: "2026-07-02T09:00:00Z"
  },
  {
    reviewId: "rev_004",
    resourceId: "res_002",
    reviewerName: "Emily Watson",
    reviewerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "A superb introduction to Generative AI. The guide describes LLMs, prompt engineering rules, and retrieval mechanisms using simple examples that actually make sense to beginners.",
    createdAt: "2026-07-05T16:20:00Z"
  },
  {
    reviewId: "rev_005",
    resourceId: "res_002",
    reviewerName: "Alex Rivera",
    reviewerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    rating: 4,
    comment: "Very clean layout and structure. Prompt design patterns are extremely useful. I wish it had more Python notebook examples, but overall a great read.",
    createdAt: "2026-07-10T11:45:00Z"
  },
  {
    reviewId: "rev_006",
    resourceId: "res_003",
    reviewerName: "Sophia Martinez",
    reviewerImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "Tailwind CSS v4 is a game-changer! The new container queries are amazing and Sarah Jenkins describes them perfectly. Highly recommended for web developers.",
    createdAt: "2026-07-12T10:00:00Z"
  },
  {
    reviewId: "rev_007",
    resourceId: "res_003",
    reviewerName: "James Carter",
    reviewerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
    rating: 4,
    comment: "Very detailed guide. The custom CSS theme variables sections are worth the read alone. Fits perfectly with modern responsive UI practices.",
    createdAt: "2026-07-15T15:30:00Z"
  },
  {
    reviewId: "rev_008",
    resourceId: "res_004",
    reviewerName: "Thomas Wright",
    reviewerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "This is exactly what I was looking for. Building APIs with Express and TypeScript in a structured way. Elena Rostova teaches in an easy-to-follow format.",
    createdAt: "2026-06-01T08:15:00Z"
  },
  {
    reviewId: "rev_009",
    resourceId: "res_005",
    reviewerName: "Lucas Bennett",
    reviewerImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "React Query changed my life! State updates feel instant and cache management is completely taken care of. Great walkthrough by Alex Mercer.",
    createdAt: "2026-07-16T17:00:00Z"
  }
];
