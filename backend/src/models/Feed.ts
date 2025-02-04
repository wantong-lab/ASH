export interface Feed {
  id: number;
  url: string;
  title: string;
  description?: string;
  lastFetched?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeedDTO {
  url: string;
  title?: string;
  description?: string;
} 