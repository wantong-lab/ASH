import { Router, Request, Response } from 'express';
import { FeedController } from '../controllers/FeedController';

const router = Router();
const feedController = new FeedController();

// Feed routes
router.post('/', (req: Request, res: Response) => feedController.addFeed(req, res));
router.get('/', (req: Request, res: Response) => feedController.getAllFeeds(req, res));
router.get('/:id', (req: Request, res: Response) => feedController.getFeed(req, res));
router.put('/:id', (req: Request, res: Response) => feedController.updateFeed(req, res));
router.delete('/:id', (req: Request, res: Response) => feedController.deleteFeed(req, res));
router.post('/:id/fetch', (req: Request, res: Response) => feedController.fetchAndUpdateFeed(req, res));

export default router; 