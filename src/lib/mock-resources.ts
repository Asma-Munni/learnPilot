import { LearningResource } from "@/app/types/resource";

export const mockResources: LearningResource[] = [
  {
    resourceId: "res_001",
    ownerId: "inst_001",
    title: "Next.js 15 App Router: The Definitive Guide",
    slug: "nextjs-15-app-router-definitive-guide",
    shortDescription: "Master Server Components, Server Actions, Suspense boundaries, dynamic routing and production optimizations in Next.js 15.",
    fullDescription: "Dive deep into the modern Next.js ecosystem. This comprehensive course covers advanced features including React Server Components (RSC), partial pre-rendering (PPR), Next.js middleware, complex layouts, data mutation with Server Actions, caching architecture, and deploying high-performance server-side web applications.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    category: "Web Development",
    resourceType: "course",
    level: "advanced",
    estimatedMinutes: 480,
    averageRating: 4.9,
    ratingCount: 156,
    publishedAt: "2026-06-15T09:00:00Z",
    tags: ["Next.js", "React", "TypeScript", "SSR"],
    status: "published",
    learningOutcomes: [
      "Architect full-stack React applications using Server Components (RSC)",
      "Optimize page load performance using Partial Pre-rendering (PPR)",
      "Secure server data endpoints with Server Actions and Zod schema validations",
      "Configure complex path middleware routing and layout caching structures"
    ],
    prerequisites: [
      "Proficient understanding of modern React hooks and state management",
      "Intermediate familiarity with TypeScript typing syntax",
      "Basic understanding of server-side requests and REST principles"
    ],
    instructorName: "Dr. Sarah Jenkins",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
    ],
    language: "English",
    certificateAvailable: true
  },
  {
    resourceId: "res_002",
    ownerId: "inst_002",
    title: "Introduction to Generative AI and LLMs",
    slug: "introduction-to-generative-ai-and-llms",
    shortDescription: "Learn the foundations of transformer models, prompt engineering techniques, and semantic search architectures.",
    fullDescription: "A beginner-friendly guide to understanding artificial intelligence, large language models (LLMs), neural network architectures, attention mechanisms, fine-tuning methodologies, and building practical generative AI applications using modern API integrations.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop",
    category: "AI & Machine Learning",
    resourceType: "guide",
    level: "beginner",
    estimatedMinutes: 180,
    averageRating: 4.7,
    ratingCount: 92,
    publishedAt: "2026-07-01T14:30:00Z",
    tags: ["AI", "GenAI", "LLM", "Prompt Engineering"],
    status: "published",
    learningOutcomes: [
      "Identify the core differences between transformer architectures and traditional neural networks",
      "Draft secure, highly effective prompt templates using modern engineering criteria",
      "Link pre-trained LLMs to external data nodes using vector database lookups (RAG)"
    ],
    prerequisites: [
      "Basic programming logic and familiarity with Python variables",
      "General awareness of software API request-response patterns"
    ],
    instructorName: "Marcus Vance",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop"
    ],
    language: "English",
    certificateAvailable: false
  },
  {
    resourceId: "res_003",
    ownerId: "inst_001",
    title: "Mastering Tailwind CSS v4 for UI Designers",
    slug: "mastering-tailwind-css-v4-ui-designers",
    shortDescription: "Unlocks the new capabilities of Tailwind CSS v4, custom theme engines, container queries, and fluid layout paradigms.",
    fullDescription: "Explore styling modern web applications with Tailwind CSS v4. Learn about the new CSS-based configuration, performance improvements, advanced grid layouts, dark mode techniques, animations, responsive design systems, and building premium interfaces that look spectacular on all screen sizes.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    category: "Design & CSS",
    resourceType: "tutorial",
    level: "intermediate",
    estimatedMinutes: 240,
    averageRating: 4.8,
    ratingCount: 210,
    publishedAt: "2026-07-10T10:15:00Z",
    tags: ["Tailwind CSS", "CSS", "UI/UX", "Responsive Layout"],
    status: "published",
    learningOutcomes: [
      "Implement the new fluid container-query attributes in Tailwind v4",
      "Construct multi-layered color design systems using custom CSS variable overrides",
      "Build complex responsive grids and layouts without writing raw media styles"
    ],
    prerequisites: [
      "Familiarity with HTML structure and CSS selectors",
      "Basic understanding of responsive design concepts (breakpoints)"
    ],
    instructorName: "Dr. Sarah Jenkins",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
    ],
    language: "English",
    certificateAvailable: true
  },
  {
    resourceId: "res_004",
    ownerId: "inst_003",
    title: "Full-Stack TypeScript with Express and MongoDB",
    slug: "full-stack-typescript-express-mongodb",
    shortDescription: "Build robust, scalable and secure RESTful APIs using TypeScript, Express.js and MongoDB database systems.",
    fullDescription: "Go from setup to production with full-stack TypeScript. This course guides you through project initialization, setting up routing middlewares, database schema validation with Zod, handling user sessions securely, error-handling conventions, testing endpoints, and optimizing query speeds in MongoDB.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    category: "Backend Development",
    resourceType: "course",
    level: "intermediate",
    estimatedMinutes: 600,
    averageRating: 4.6,
    ratingCount: 84,
    publishedAt: "2026-05-20T08:00:00Z",
    tags: ["TypeScript", "Express", "MongoDB", "Node.js"],
    status: "published",
    learningOutcomes: [
      "Construct type-safe routing maps and requests using Express and TypeScript compiler checks",
      "Write safe schemas and validators with Zod to sanitize client requests",
      "Integrate MongoDB data nodes efficiently and build fast index schemas"
    ],
    prerequisites: [
      "Familiarity with asynchronous JavaScript logic (Promises, async/await)",
      "Basic understand of relational or non-relational database theories"
    ],
    instructorName: "Elena Rostova",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
    ],
    language: "English",
    certificateAvailable: true
  },
  {
    resourceId: "res_005",
    ownerId: "inst_004",
    title: "React Query (TanStack Query) State Syncing",
    slug: "react-query-tanstack-query-state-syncing",
    shortDescription: "Eliminate global state boilerplate by leveraging TanStack Query for cache invalidation, polling, and mutations.",
    fullDescription: "Learn how to manage server-state seamlessly in your React applications. We cover query keys design patterns, automatic refetching, mutations, optimistic UI updates, infinite query implementations for pagination, pre-fetching strategies, and debugging with query developer tools.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    category: "Web Development",
    resourceType: "tutorial",
    level: "advanced",
    estimatedMinutes: 150,
    averageRating: 4.9,
    ratingCount: 65,
    publishedAt: "2026-07-12T16:45:00Z",
    tags: ["React Query", "Data Fetching", "State Management"],
    status: "published",
    learningOutcomes: [
      "Synchronize component UI with databases using TanStack cache configurations",
      "Implement smooth pagination and infinite scrolls without layout flicker",
      "Write mutation hooks to update and roll back UI elements optimistically on network failures"
    ],
    prerequisites: [
      "React state hooks proficiency (useState, useEffect, useMemo)",
      "API request experience (fetch or axios)"
    ],
    instructorName: "Alex Mercer",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop"
    ],
    language: "English",
    certificateAvailable: false
  },
  {
    resourceId: "res_006",
    ownerId: "inst_002",
    title: "Secure Authentication with Better Auth",
    slug: "secure-authentication-with-better-auth",
    shortDescription: "Configure robust user sessions, role-based controls, email logins, and third-party social integrations in minutes.",
    fullDescription: "A complete walkthrough of the Better Auth package. You will learn how to initialize the authentication client and server configurations, link database adapters (specifically MongoDB), implement secure signup and login views, setup multi-provider OAuth, restrict routes by roles, and protect APIs against security exploits.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    category: "Cyber Security",
    resourceType: "article",
    level: "beginner",
    estimatedMinutes: 90,
    averageRating: 4.5,
    ratingCount: 38,
    publishedAt: "2026-07-18T11:20:00Z",
    tags: ["Security", "Authentication", "Better Auth", "OAuth"],
    status: "published",
    learningOutcomes: [
      "Initialize Better Auth middleware and client scripts on App Router templates",
      "Implement role authorization checks on routes and request pipelines",
      "Connect and structure secure user storage schemas in MongoDB"
    ],
    prerequisites: [
      "Basic understanding of cookies and request headers in web browsers",
      "Familiarity with Next.js route configurations"
    ],
    instructorName: "Marcus Vance",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: false
  },
  {
    resourceId: "res_007",
    ownerId: "inst_003",
    title: "Python for Data Analysis and Science",
    slug: "python-for-data-analysis-and-science",
    shortDescription: "Learn how to use NumPy, Pandas, Matplotlib, and Seaborn to manipulate, analyze, and visualize data structures.",
    fullDescription: "A comprehensive course taking you from Python basics to advanced data manipulation workflows. You will perform practical tasks with real-world datasets, clean unstructured data, run statistical summaries, and build clean dashboards.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    category: "Data Science",
    resourceType: "course",
    level: "intermediate",
    estimatedMinutes: 360,
    averageRating: 4.7,
    ratingCount: 120,
    publishedAt: "2026-06-10T14:00:00Z",
    tags: ["Python", "Pandas", "Data Science", "Visualization"],
    status: "published",
    learningOutcomes: [
      "Process and structure dataset files with Pandas DataFrames",
      "Create high-quality analytics visualizations and plots using Seaborn",
      "Optimize data calculations using multi-dimensional NumPy arrays"
    ],
    prerequisites: [
      "Basic python loop syntax and list structures",
      "General understanding of charts and mathematical indices"
    ],
    instructorName: "Elena Rostova",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: true
  },
  {
    resourceId: "res_008",
    ownerId: "inst_004",
    title: "Docker and Kubernetes Essentials",
    slug: "docker-and-kubernetes-essentials",
    shortDescription: "Deploy and orchestrate scalable applications using modern container techniques and cluster configurations.",
    fullDescription: "Understand container virtualization fundamentals. You will configure Dockerfiles, manage multi-container systems using Docker Compose, initialize Kubernetes pods, manage deployments, handle persistent volumes, and set up ingress controllers.",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
    category: "DevOps",
    resourceType: "guide",
    level: "beginner",
    estimatedMinutes: 120,
    averageRating: 4.6,
    ratingCount: 45,
    publishedAt: "2026-07-02T16:00:00Z",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
    status: "published",
    learningOutcomes: [
      "Structure multi-stage Dockerfiles to build lightweight images",
      "Manage networks and data volumes between multiple local containers",
      "Orchestrate application replication and load balancing in Kubernetes clusters"
    ],
    prerequisites: [
      "General shell command basics (bash/zsh/powershell)",
      "Familiarity with server network ports and protocols"
    ],
    instructorName: "Alex Mercer",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: false
  },
  {
    resourceId: "res_009",
    ownerId: "inst_001",
    title: "Master Rust Programming Language",
    slug: "master-rust-programming-language",
    shortDescription: "Write blazing-fast, memory-safe system utilities and web microservices without a garbage collector.",
    fullDescription: "Deep dive into Rust concepts. Understand the borrow checker, ownership principles, lifetime parameters, safe concurrency paradigms, pattern matching, error handling with Result and Option, and building fast server engines.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    category: "Web Development",
    resourceType: "course",
    level: "advanced",
    estimatedMinutes: 540,
    averageRating: 4.9,
    ratingCount: 78,
    publishedAt: "2026-07-05T09:00:00Z",
    tags: ["Rust", "Systems Programming", "WebAssembly", "Safety"],
    status: "published",
    learningOutcomes: [
      "Resolve compilation issues related to borrow checking and references",
      "Implement fast system concurrency using thread-safe channels",
      "Structure system applications securely with pattern match rules and custom enum results"
    ],
    prerequisites: [
      "Solid understand of pointers and heap vs stack memory",
      "Background in another system language (C/C++ or Go)"
    ],
    instructorName: "Dr. Sarah Jenkins",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: true
  },
  {
    resourceId: "res_010",
    ownerId: "inst_002",
    title: "Introduction to Cyber Security and Hacking",
    slug: "introduction-to-cyber-security-and-hacking",
    shortDescription: "Protect critical network systems and web apps from common security threats and scanning bugs.",
    fullDescription: "Get started with defensive security. Learn about cryptography, network protocols, SQL injection, cross-site scripting (XSS), vulnerability scans, security logging, and basic penetration testing guidelines.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    category: "Cyber Security",
    resourceType: "tutorial",
    level: "beginner",
    estimatedMinutes: 180,
    averageRating: 4.4,
    ratingCount: 30,
    publishedAt: "2026-06-25T11:00:00Z",
    tags: ["Security", "Networking", "Hacking", "Cryptography"],
    status: "published",
    learningOutcomes: [
      "Recognize key server attack surfaces like XSS, SQLi, and CSRF vulnerabilities",
      "Encrypt sensitive data assets using symmetrical and asymmetrical cryptographic tools",
      "Scan ports and networks securely to audit threat indicators"
    ],
    prerequisites: [
      "Basic understanding of HTTP packets and network parameters",
      "Familiarity with server terminal commands"
    ],
    instructorName: "Marcus Vance",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: false
  },
  {
    resourceId: "res_011",
    ownerId: "inst_003",
    title: "Advanced CSS Grid and Web Animations",
    slug: "advanced-css-grid-and-web-animations",
    shortDescription: "Build complex, high-performance web layouts and gorgeous micro-interactions using native CSS features.",
    fullDescription: "Explore advanced styling techniques. Master CSS grid areas, subgrids, layout alignment, transform matrixes, keyframe animations, transition optimizations, scroll-linked animations, and fluid responsive design without layout shifts.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    category: "Design & CSS",
    resourceType: "guide",
    level: "advanced",
    estimatedMinutes: 150,
    averageRating: 4.8,
    ratingCount: 110,
    publishedAt: "2026-07-08T10:00:00Z",
    tags: ["CSS Grid", "Animations", "Design System", "CSS3"],
    status: "published",
    learningOutcomes: [
      "Map dynamic layouts using native subgrids and custom area tokens",
      "Optimize animates to prevent rendering reflow issues in browsers",
      "Deploy scroll animations utilizing pure CSS style selectors"
    ],
    prerequisites: [
      "Solid CSS specificity understand and core CSS variables background",
      "Experience styling interactive elements"
    ],
    instructorName: "Elena Rostova",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: false
  },
  {
    resourceId: "res_012",
    ownerId: "inst_004",
    title: "Machine Learning Scratchpad with NumPy",
    slug: "machine-learning-scratchpad-with-numpy",
    shortDescription: "Build and train linear regressions, logistic models, and basic neural nodes from scratch using raw math arrays.",
    fullDescription: "Demystify machine learning libraries. Implement gradient descent, forward and backward propagation, loss calculation, regularization, and model evaluations without relying on PyTorch or Scikit-Learn.",
    imageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop",
    category: "AI & Machine Learning",
    resourceType: "course",
    level: "advanced",
    estimatedMinutes: 420,
    averageRating: 4.7,
    ratingCount: 67,
    publishedAt: "2026-07-15T15:30:00Z",
    tags: ["Machine Learning", "NumPy", "Algorithms", "Mathematics"],
    status: "published",
    learningOutcomes: [
      "Construct neural network mathematics from fundamental linear layers",
      "Calculate error derivatives using backpropagation formulas",
      "Clean datasets and execute model optimization cycles using raw NumPy matrices"
    ],
    prerequisites: [
      "General high school calculus and vector/matrix algebra rules",
      "Intermediate programming logic in python"
    ],
    instructorName: "Alex Mercer",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    language: "English",
    certificateAvailable: true
  }
];
