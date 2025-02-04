import Parser from 'rss-parser';
import pool from '../config/database';
import { Feed, CreateFeedDTO } from '../models/Feed';
import { Article, CreateArticleDTO } from '../models/Article';

export class FeedService {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  async addFeed(feedData: CreateFeedDTO): Promise<Feed> {
    const { url, title, description } = feedData;
    
    const result = await pool.query(
      'INSERT INTO feeds (url, title, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
      [url, title || '', description || '']
    );

    return result.rows[0];
  }

  async getFeed(id: number): Promise<Feed | null> {
    const result = await pool.query('SELECT * FROM feeds WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getAllFeeds(): Promise<Feed[]> {
    const result = await pool.query('SELECT * FROM feeds ORDER BY created_at DESC');
    return result.rows;
  }

  async updateFeed(id: number, feedData: Partial<CreateFeedDTO>): Promise<Feed | null> {
    const { url, title, description } = feedData;
    
    const result = await pool.query(
      'UPDATE feeds SET url = COALESCE($1, url), title = COALESCE($2, title), description = COALESCE($3, description), updated_at = NOW() WHERE id = $4 RETURNING *',
      [url, title, description, id]
    );

    return result.rows[0] || null;
  }

  async deleteFeed(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM feeds WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  async fetchAndUpdateFeed(feedId: number): Promise<Article[]> {
    const feed = await this.getFeed(feedId);
    if (!feed) throw new Error('Feed not found');

    const parsedFeed = await this.parser.parseURL(feed.url);
    const articles: Article[] = [];

    for (const item of parsedFeed.items) {
      const articleData: CreateArticleDTO = {
        feedId,
        title: item.title || 'Untitled',
        link: item.link || '',
        description: item.description,
        content: item.content,
        author: item.creator,
        publishDate: item.pubDate ? new Date(item.pubDate) : new Date(),
      };

      const result = await pool.query(
        'INSERT INTO articles (feed_id, title, link, description, content, author, publish_date, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) ON CONFLICT (feed_id, link) DO UPDATE SET title = $2, description = $4, content = $5, author = $6, updated_at = NOW() RETURNING *',
        [articleData.feedId, articleData.title, articleData.link, articleData.description, articleData.content, articleData.author, articleData.publishDate]
      );

      articles.push(result.rows[0]);
    }

    await pool.query('UPDATE feeds SET last_fetched = NOW() WHERE id = $1', [feedId]);

    return articles;
  }
} 