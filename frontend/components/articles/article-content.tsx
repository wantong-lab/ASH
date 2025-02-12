"use client"

export default function ArticleContent() {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
      <article className="max-w-3xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">
            Chinese military monitored US ships crossing Taiwan strait, state media reports
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            World News | Latest Top Stories | Reuters
            <br />
            2025/2/12 07:51:35 · 12
          </div>
        </header>
        <div className="prose dark:prose-invert">
          <p>
            China's military said it organised naval and air forces to monitor the navigation operations of a U.S.
            destroyer and oceanographic survey ship crossing the Taiwan Strait from February 10-12, according to state
            broadcaster CCTV on Tuesday.
          </p>
        </div>
      </article>
    </div>
  )
}

