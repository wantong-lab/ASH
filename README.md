# ASH - Advanced Smart Hub

ASH (Advanced Smart Hub) 是一个现代化的信息聚合与个性化浏览工具，为信息重度用户（如新闻爱好者、开发者、内容创作者）提供简洁优雅的阅读体验。通过ASH，你可以轻松管理和阅读来自多个平台的订阅内容。

## 产品愿景

打造下一代信息聚合与个性化浏览工具，让用户能够更轻松地获取、管理和分享有价值的信息。

## 功能特点

### 当前版本（MVP）
- RSS订阅管理
  - 添加新的RSS订阅源
  - 查看订阅列表
  - 自动更新订阅内容（每30分钟）
- 文章阅读
  - 查看文章列表
  - 阅读文章内容
  - 支持图片显示
  - 原文链接跳转

### 即将推出的功能
1. **多源信息聚合**
   - 支持社交媒体（X、Instagram、YouTube）
   - 支持播客和通知（GitHub仓库更新等）
   - 自定义脚本抓取支持

2. **AI 智能处理**
   - 文章自动摘要与翻译
   - 基于阅读历史的个性化推荐
   - AI驱动的每日简报（早晚各一次）

3. **社交与协作**
   - 订阅列表共享（公开/私密）
   - 用户关注系统
   - 文章评论与批注

4. **跨平台支持**
   - 桌面客户端（Windows/macOS/Linux）
   - 浏览器插件
   - 移动端应用（规划中）

5. **扩展功能**
   - 插件系统（支持自定义数据源）
   - 开放API接口
   - 社区驱动的内容适配器

## 技术栈

### 前端
- Next.js 13+ (React 18)
- TypeScript
- TailwindCSS（UI样式）
- Shadcn/ui（UI组件库）
- React Query（数据获取和缓存）
- Electron（桌面应用，规划中）
- React Native（移动端，规划中）

### 后端
- Node.js
- Express
- SQLite（数据存储）
- RSS Parser（RSS解析）
- Winston（日志记录）
- Node-cron（定时任务）

### AI 集成（规划中）
- OpenAI API（文本摘要和翻译）
- Langchain（AI工作流）
- Whisper（语音转文字）

### 基础设施
- Docker（容器化部署）
- GitHub Actions（CI/CD）
- Vercel（前端部署）

## 快速开始

### 环境要求
- Node.js 18+
- npm 8+

### 安装和运行

1. 克隆项目后，分别安装前端和后端依赖：

```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd frontend
npm install
```

2. 启动后端服务：

```bash
cd backend
npm run dev
```

3. 启动前端开发服务器：

```bash
cd frontend
npm run dev
```

4. 访问应用：
打开浏览器访问 http://localhost:5173

## 使用说明

1. 添加RSS订阅：
   - 在顶部输入框中输入RSS订阅地址
   - 点击"添加订阅"按钮

2. 查看文章：
   - 在左侧订阅列表中选择要查看的订阅源
   - 右侧会显示该订阅源的所有文章
   - 点击文章标题可以跳转到原文

## 开发计划

### 第一阶段（当前）
- [x] 基础RSS订阅功能
- [x] 文章阅读界面
- [x] 自动更新订阅内容
- [ ] 移动端适配优化
- [ ] 订阅源分类管理
- [ ] 文章搜索功能

### 第二阶段（进行中）
- [ ] AI 功能集成
  - [ ] 文章自动摘要
  - [ ] 多语言翻译
  - [ ] 每日AI简报
- [ ] 社交功能
  - [ ] 用户系统
  - [ ] 订阅列表共享
  - [ ] 文章评论

### 第三阶段（规划中）
- [ ] 多平台支持
  - [ ] 桌面客户端（Electron）
  - [ ] 浏览器插件
  - [ ] 移动应用（React Native）
- [ ] 扩展系统
  - [ ] 插件API
  - [ ] 自定义数据源
  - [ ] 社区适配器

### 第四阶段（远期）
- [ ] 高级AI功能
  - [ ] 个性化推荐
  - [ ] 智能标签
  - [ ] 内容聚类
- [ ] 社区生态
  - [ ] 插件市场
  - [ ] 订阅源目录
  - [ ] 贡献者计划

## 项目结构

```
.
├── backend/                # ASH后端代码
│   ├── src/
│   │   └── index.js       # 后端入口文件
│   └── package.json
├── frontend/              # ASH前端代码
│   ├── app/              # Next.js 13+ App Router 目录
│   │   ├── globals.css   # 全局样式文件
│   │   ├── layout.tsx    # 根布局组件
│   │   └── page.tsx      # 首页组件
│   ├── components/       # 可复用组件目录
│   │   ├── articles/     # 文章相关组件
│   │   ├── layouts/      # 布局相关组件
│   │   ├── navigation/   # 导航相关组件
│   │   ├── sidebars/     # 侧边栏组件
│   │   ├── ui/          # 基础UI组件
│   │   ├── DailyBriefing.tsx  # 每日简报组件
│   │   ├── FeedItem.tsx      # RSS源条目组件
│   │   ├── FeedView.tsx      # RSS源查看组件
│   │   ├── Navigation.tsx    # 主导航组件
│   │   ├── SearchBar.tsx     # 搜索栏组件
│   │   └── theme-provider.tsx # 主题提供者组件
│   ├── contexts/         # React Context 目录
│   │   └── ThemeContext.tsx  # 主题上下文
│   ├── hooks/           # 自定义Hook目录
│   │   ├── use-mobile.tsx   # 移动端适配Hook
│   │   └── use-toast.ts     # 消息提示Hook
│   ├── lib/            # 工具库目录
│   │   └── utils.ts    # 通用工具函数
│   ├── public/         # 静态资源目录
│   ├── styles/         # 样式文件目录
│   ├── types/          # TypeScript类型定义目录
│   ├── utils/          # 工具函数目录
│   ├── App.tsx         # 应用程序主组件
│   ├── next.config.mjs # Next.js配置文件
│   ├── package.json    # 项目依赖配置
│   ├── tailwind.config.ts # Tailwind CSS配置
│   └── tsconfig.json   # TypeScript配置
└── README.md
```

## 数据库结构

### feeds表
- id: 主键
- url: RSS订阅地址
- title: 订阅源标题
- description: 订阅源描述
- last_updated: 最后更新时间

### articles表
- id: 主键
- feed_id: 关联的订阅源ID
- title: 文章标题
- link: 文章链接
- content: 文章内容
- pub_date: 发布时间

## 错误处理

- 订阅添加失败：检查RSS地址是否正确
- 内容更新失败：查看后端日志文件
- 数据库错误：检查数据库文件权限

## 日志记录

- 错误日志：`error.log`
- 综合日志：`combined.log`

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT
