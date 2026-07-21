import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import ReactMarkdown from 'react-markdown'
import { articles, getArticleBySlug } from './articles'
import { about, focusAreas, profile, projects } from './siteData'
import './styles.css'

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

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <span className="section-label">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function ProjectList() {
  return (
    <section className="frame section-block reveal" id="projects" aria-labelledby="projects-title">
      <SectionHeader
        eyebrow="OPEN SOURCE"
        title="开源项目与关注"
        description="先展示当前公开仓库和关注方向。后面有更成熟的个人项目时，可以直接在数据文件里替换。"
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-row" key={project.name}>
            <span className="row-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="project-meta">{project.type} / {project.language}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <div className="project-side">
              <span>{project.status}</span>
              <a href={project.url} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ThoughtList() {
  return (
    <section className="frame section-block thoughts-band reveal" id="writing" aria-labelledby="writing-title">
      <SectionHeader
        eyebrow="WRITING"
        title="工作思考与文章"
        description="文章已经从页面数据升级为 Markdown 文件。现在可以先沉淀主题，后续直接在 Markdown 里继续写正文。"
      />
      <div className="thought-grid">
        {articles.map((article) => (
          <article className="thought-item" key={article.slug}>
            <div className="thought-topline">
              <span>{article.category}</span>
              <time>{article.date}</time>
            </div>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <a className="article-link" href={`#writing/${article.slug}`}>
              {article.status}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="frame section-block about-section reveal" id="about" aria-labelledby="about-title">
      <SectionHeader eyebrow="ABOUT" title="关于我" description={about.summary} />
      <div className="about-layout">
        <div className="principles">
          {about.principles.map((item, index) => (
            <p key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </p>
          ))}
        </div>
        <div className="contact-list" aria-label="联系方式">
          {about.contact.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noreferrer">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticlePage({ article }) {
  if (!article) {
    return (
      <main className="page-shell article-shell">
        <a className="wordmark" href="#top" aria-label="返回首页">
          XH<span>.</span>
        </a>
        <section className="frame article-page">
          <span className="section-label">WRITING</span>
          <h1>文章不存在</h1>
          <p>这个链接没有匹配到当前的 Markdown 文章。</p>
          <a className="primary-link" href="#writing">
            返回文章列表
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell article-shell">
      <nav className="nav article-nav" aria-label="文章导航">
        <a className="wordmark" href="#top" aria-label="返回首页">
          XH<span>.</span>
        </a>
        <a className="back-link" href="#writing">返回文章列表</a>
      </nav>

      <article className="frame article-page">
        <div className="article-kicker">
          <span>{article.category}</span>
          <time>{article.date}</time>
        </div>
        <h1>{article.title}</h1>
        <p className="article-summary">{article.summary}</p>
        <div className="article-content">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  )
}

function App() {
  const [activeSlug, setActiveSlug] = React.useState(() => window.location.hash.replace(/^#writing\/?/, ''))

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      setActiveSlug(hash.startsWith('#writing/') ? hash.replace(/^#writing\/?/, '') : '')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const revealNodes = document.querySelectorAll('.reveal')
    document.documentElement.classList.add('js-ready')

    if (!('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    revealNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [activeSlug])

  if (activeSlug) {
    return <ArticlePage article={getArticleBySlug(activeSlug)} />
  }

  return (
    <main className="page-shell">
      <nav className="nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="返回顶部">
          XH<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#projects">项目</a>
          <a href="#writing">文章</a>
          <a href="#about">关于</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      <section className="frame hero reveal" id="top">
        <p className="hero-slogan">PERSONAL HOMEPAGE / 2026</p>
        <div className="hero-main">
          <div>
            <h1>
              嗨，我是 <em>{profile.name}</em>。
              <br />
              这里会持续更新我的项目与思考。
            </h1>
            <div className="focus-strip" aria-label="主页内容方向">
              {focusAreas.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <TiltedCard />
        </div>
        <div className="hero-footer">
          <p className="intro">{profile.intro}</p>
          <a className="primary-link" href="#projects">
            查看内容结构
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className="quote-divider reveal" aria-hidden="true">
        <span>真实项目 · 长期写作 · 持续迭代</span>
      </div>

      <section className="frame status reveal" aria-label="当前状态">
        <div>
          <span className="status-dot" aria-hidden="true" />
          <p>当前状态</p>
        </div>
        <strong>{profile.role}</strong>
        <span className="status-index">01 / BUILDING</span>
      </section>

      <ProjectList />
      <ThoughtList />
      <About />

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
