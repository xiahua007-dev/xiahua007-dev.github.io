import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

const profile = {
  name: 'Xiahua',
  role: '正在建设自己的数字花园',
  intro: '你好，欢迎来到我的个人主页。这里会慢慢放上我的项目、经历和最近在做的事情。',
  github: 'https://github.com/xiahua007-dev',
}

function App() {
  return (
    <main className="page-shell">
      <nav className="nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="返回顶部">
          XH<span>.</span>
        </a>
        <a className="nav-link" href={profile.github} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <p className="eyebrow">PERSONAL HOMEPAGE · 2026</p>
        <h1>
          嗨，我是 <em>{profile.name}</em>。
          <br />
          欢迎来到我的主页。
        </h1>
        <div className="hero-footer">
          <p className="intro">{profile.intro}</p>
          <a className="primary-link" href={profile.github} target="_blank" rel="noreferrer">
            查看我的 GitHub
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="status" aria-label="当前状态">
        <div>
          <span className="status-dot" aria-hidden="true" />
          <p>当前状态</p>
        </div>
        <strong>{profile.role}</strong>
        <span className="status-index">01 / START</span>
      </section>

      <footer>
        <p>Built with React + Vite</p>
        <p>© 2026 {profile.name}</p>
      </footer>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
