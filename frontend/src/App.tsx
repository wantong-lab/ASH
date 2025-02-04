import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>RSS Reader</h1>
      </header>
      <main className="app-main">
        <div className="feed-list">
          {/* Feed list will go here */}
        </div>
        <div className="article-list">
          {/* Articles will go here */}
        </div>
      </main>
    </div>
  )
}

export default App 