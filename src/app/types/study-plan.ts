export type StudyPlanStatus =
  | "active"
  | "completed"
  | "archived";

export type StudyTaskStatus =
  | "pending"
  | "completed"
  | "skipped";

export type StudyMilestone = {
  milestoneId: string;
  title: string;
  description: string;
  targetDate: string;
};

export type StudyTask = {
  taskId: string;
  title: string;
  description: string;
  scheduledDate: string;
  estimatedMinutes: number;
  resourceIds: string[];
  status: StudyTaskStatus;
};

export type StudyPlan = {
  planId: string;
  userId: string;

  title: string;
  summary: string;
  goal: string;

  currentLevel:
    | "beginner"
    | "intermediate"
    | "advanced";

  startDate: string;
  deadline: string;

  dailyStudyMinutes: number;
  daysPerWeek: number;

  weakTopics: string[];

  preferredLearningStyle:
    | "visual"
    | "reading"
    | "practical"
    | "mixed";

  milestones: StudyMilestone[];
  tasks: StudyTask[];

  progressPercentage: number;
  status: StudyPlanStatus;
  model: string;
  schemaVersion: number;

  createdAt: string;
  updatedAt: string;
};

export type StudyPlansPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type StudyPlansResponse = {
  success: true;
  message: string;
  data: StudyPlan[];
  pagination: StudyPlansPagination;
};

export type StudyPlanDetailsResponse = {
  success: true;
  message: string;
  data: StudyPlan;
};