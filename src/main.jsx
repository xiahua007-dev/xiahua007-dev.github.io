import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

const profile = {
  name: 'Xiahua',
  role: '正在建设自己的数字花园',
  intro: '你好，欢迎来到我的个人主页。这里会慢慢放上我的项目、经历和最近在做的事情。',
  github: 'https://github.com/xiahua007-dev',
  avatar: 'https://avatars.githubusercontent.com/u/17287324?v=4',
  handle: '@xiahua007-dev',
}

function TiltedCard() {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return

    const card = cardRef.current
    if (!card) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1)
    const y = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1)
    const rotateX = (0.5 - y) * 14
    const rotateY = (x - 0.5) * 14

    card.classList.add('is-active')
    card.style.setProperty('--glare-x', `${x * 100}%`)
    card.style.setProperty('--glare-y', `${y * 100}%`)
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.028, 1.028, 1.028)`
  }

  const resetCard = () => {
    const card = cardRef.current
    if (!card) return

    card.classList.remove('is-active')
    card.style.setProperty('--glare-x', '50%')
    card.style.setProperty('--glare-y', '50%')
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div className="portrait-stage">
      <p className="portrait-hint">MOVE YOUR CURSOR</p>
      <a
        className="tilted-card-link"
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="查看 Xiahua 的 GitHub 主页"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetCard}
        onBlur={resetCard}
      >
        <figure ref={cardRef} className="tilted-card">
          <img src={profile.avatar} alt="Xiahua 的 GitHub 头像" />
          <span className="card-glare" aria-hidden="true" />
          <figcaption>
            <span>{profile.handle}</span>
            <strong>GitHub ↗</strong>
          </figcaption>
        </figure>
      </a>
      <span className="portrait-number" aria-hidden="true">
        / 001
      </span>
    </div>
  )
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
        <div className="hero-main">
          <h1>
            嗨，我是 <em>{profile.name}</em>。
            <br />
            欢迎来到我的主页。
          </h1>
          <TiltedCard />
        </div>
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
