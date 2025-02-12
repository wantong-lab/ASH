import MainLayout from "@/components/layouts/main-layout"
import LeftSidebar from "@/components/sidebars/left-sidebar"
import ArticleList from "@/components/articles/article-list"
import ArticleContent from "@/components/articles/article-content"

export default function Home() {
  return (
    <MainLayout>
      <div className="flex h-screen">
        <LeftSidebar />
        <ArticleList />
        <ArticleContent />
      </div>
    </MainLayout>
  )
}

