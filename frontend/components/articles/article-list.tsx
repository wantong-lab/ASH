"use client"
import type { Article } from "@/types"

export default function ArticleList() {
  const articles: Article[] = [
    {
      id: "1",
      title: "North Korea condemns Trump's Gaza takeover proposal as 'ludicrous'",
      content: "North Korean state media on Wednesday denounced U.S. President Donald Trump's proposal...",
      source: "World News | Latest Top Stories | Reuters",
      timestamp: "1小时前",
      type: "blog",
    },
    {
      id: "2",
      title: "White House correspondents protest access denial over 'Gulf of Mexico' naming issue",
      content: "The White House Correspondents' Association protested a decision by the White House on T...",
      source: "World News | Latest Top Stories | Reuters",
      timestamp: "1小时前",
      type: "blog",
    },
  ]

  return (
    <div className="w-[400px] border-r bg-white dark:bg-gray-800">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="font-semibold">今天</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {articles.map((article) => (
          <article
            key={article.id}
            className="p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer dark:border-gray-700"
          >
            <div className="space-y-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {article.source} · {article.timestamp}
              </div>
              <h3 className="font-medium dark:text-gray-200">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{article.content}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

