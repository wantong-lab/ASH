const translations = {
  zh: {
    timeline: "时间线",
    smartView: "智能视图",
    mostRecent: "最新",
    mostPopular: "最热",
    categories: "分类",
    dailyBriefing: "每日简报",
    topStories: "热门故事",
    trendingKeywords: "热门关键词",
    search: "搜索订阅源、标签或内容...",
    summary: "摘要",
    translate: "翻译",
    source: "来源",
  },
}

export function t(key: keyof typeof translations.zh): string {
  return translations.zh[key] || key
}

