import { Request, Response } from 'express';
import { FeedService } from '../services/FeedService';

export class FeedController {
  private feedService: FeedService;

  constructor() {
    this.feedService = new FeedService();
  }

  async addFeed(req: Request, res: Response) {
    try {
      const feed = await this.feedService.addFeed(req.body);
      res.status(201).json(feed);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add feed' });
    }
  }

  async getFeed(req: Request, res: Response) {
    try {
      const feed = await this.feedService.getFeed(Number(req.params.id));
      if (feed) {
        res.json(feed);
      } else {
        res.status(404).json({ error: 'Feed not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to get feed' });
    }
  }

  async getAllFeeds(req: Request, res: Response) {
    try {
      const feeds = await this.feedService.getAllFeeds();
      res.json(feeds);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get feeds' });
    }
  }

  async updateFeed(req: Request, res: Response) {
    try {
      const feed = await this.feedService.updateFeed(Number(req.params.id), req.body);
      if (feed) {
        res.json(feed);
      } else {
        res.status(404).json({ error: 'Feed not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update feed' });
    }
  }

  async deleteFeed(req: Request, res: Response) {
    try {
      const success = await this.feedService.deleteFeed(Number(req.params.id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Feed not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete feed' });
    }
  }

  async fetchAndUpdateFeed(req: Request, res: Response) {
    try {
      const articles = await this.feedService.fetchAndUpdateFeed(Number(req.params.id));
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch and update feed' });
    }
  }
} 