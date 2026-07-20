export type ResourceInsightItem = {
  name: string;
  count: number;
};

export type ResourceInsightsData = {
  totalResources: number;
  categories: ResourceInsightItem[];
  levels: ResourceInsightItem[];
  resourceTypes: ResourceInsightItem[];
};

export type ResourceInsightsResponse = {
  success: true;
  message: string;
  data: ResourceInsightsData;
};