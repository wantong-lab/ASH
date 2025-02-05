const express = require('express');
const cors = require('cors');
const RSSParser = require('rss-parser');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');
const winston = require('winston');
const path = require('path');

// 配置日志
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'ash-backend' },
  transports: [
    // 错误日志
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // 应用日志
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // 数据库操作日志
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/db.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// 未捕获异常的处理
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const parser = new RSSParser();

// 确保日志目录存在
const fs = require('fs');
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 数据库连接
const db = new sqlite3.Database('rss.db', (err) => {
  if (err) {
    logger.error('Database connection error:', err);
  } else {
    logger.info('Connected to SQLite database');
  }
});

// 请求日志中间件
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      type: 'request',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    });
  });
  next();
});

// 中间件
app.use(cors());
app.use(express.json());

// 初始化数据库
db.serialize(() => {
  logger.info('Initializing database tables');
  db.run(`CREATE TABLE IF NOT EXISTS feeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    title TEXT,
    description TEXT,
    last_updated DATETIME
  )`, (err) => {
    if (err) {
      logger.error('Error creating feeds table:', err);
    } else {
      logger.info('Feeds table initialized successfully');
    }
  });
  
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feed_id INTEGER,
    title TEXT,
    link TEXT UNIQUE,
    content TEXT,
    pub_date DATETIME,
    FOREIGN KEY(feed_id) REFERENCES feeds(id)
  )`, (err) => {
    if (err) {
      logger.error('Error creating articles table:', err);
    } else {
      logger.info('Articles table initialized successfully');
    }
  });
});

// RSS订阅管理路由
app.post('/api/feeds', async (req, res) => {
  const { url } = req.body;
  logger.info(`Attempting to add new feed: ${url}`);
  
  try {
    const feed = await parser.parseURL(url);
    logger.info(`Successfully parsed feed: ${feed.title}`);
    
    db.run('INSERT INTO feeds (url, title, description, last_updated) VALUES (?, ?, ?, ?)',
      [url, feed.title, feed.description, new Date().toISOString()],
      function(err) {
        if (err) {
          logger.error('Error adding feed to database:', { error: err, url });
          return res.status(400).json({ error: 'Feed already exists or invalid' });
        }
        logger.info(`Successfully added feed to database: ${feed.title} (ID: ${this.lastID})`);
        res.json({ id: this.lastID, title: feed.title });
      });
  } catch (error) {
    logger.error('Error parsing feed:', { error, url });
    res.status(400).json({ error: 'Invalid RSS feed' });
  }
});

app.get('/api/feeds', (req, res) => {
  logger.info('Fetching all feeds');
  db.all('SELECT * FROM feeds', (err, rows) => {
    if (err) {
      logger.error('Error fetching feeds:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    logger.info(`Successfully retrieved ${rows.length} feeds`);
    res.json(rows);
  });
});

app.get('/api/feeds/:id/articles', (req, res) => {
  const { id } = req.params;
  logger.info(`Fetching articles for feed ID: ${id}`);
  
  db.all('SELECT * FROM articles WHERE feed_id = ? ORDER BY pub_date DESC', [id], (err, rows) => {
    if (err) {
      logger.error('Error fetching articles:', { error: err, feedId: id });
      return res.status(500).json({ error: 'Database error' });
    }
    logger.info(`Successfully retrieved ${rows.length} articles for feed ID: ${id}`);
    res.json(rows);
  });
});

// 定时更新订阅内容
cron.schedule('*/30 * * * *', async () => {
  logger.info('Starting scheduled feed update job');
  
  db.all('SELECT * FROM feeds', async (err, feeds) => {
    if (err) {
      logger.error('Error fetching feeds for update:', err);
      return;
    }
    
    logger.info(`Found ${feeds.length} feeds to update`);
    
    for (const feed of feeds) {
      try {
        logger.info(`Updating feed: ${feed.title} (${feed.url})`);
        const parsedFeed = await parser.parseURL(feed.url);
        let newArticlesCount = 0;
        
        for (const item of parsedFeed.items) {
          db.run('INSERT OR IGNORE INTO articles (feed_id, title, link, content, pub_date) VALUES (?, ?, ?, ?, ?)',
            [feed.id, item.title, item.link, item.content, new Date(item.pubDate).toISOString()],
            function(err) {
              if (err) {
                logger.error('Error inserting article:', { error: err, feedId: feed.id, articleTitle: item.title });
              } else if (this.changes > 0) {
                newArticlesCount++;
              }
            });
        }
        
        db.run('UPDATE feeds SET last_updated = ? WHERE id = ?',
          [new Date().toISOString(), feed.id],
          (err) => {
            if (err) {
              logger.error('Error updating feed last_updated:', { error: err, feedId: feed.id });
            } else {
              logger.info(`Successfully updated feed: ${feed.title}, added ${newArticlesCount} new articles`);
            }
          });
      } catch (error) {
        logger.error(`Error updating feed ${feed.url}:`, { error, feedId: feed.id });
      }
    }
    
    logger.info('Completed feed update job');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`ASH Backend Server running on port ${PORT}`);
  console.log(`ASH Backend Server running on port ${PORT}`);
}); 