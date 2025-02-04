export interface Article {
  id: number;
  feedId: number;
  title: string;
  link: string;
  description?: string;
  content?: string;
  author?: string;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticleDTO {
  feedId: number;
  title: string;
  link: string;
  description?: string;
  content?: string;
  author?: string;
  publishDate: Date;
} 