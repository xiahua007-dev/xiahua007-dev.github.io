import React, { useEffect, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import Fuse from 'fuse.js'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

function ArticleCard({ article, variant = 'card' }) {
  return (
    <a className={`thought-item ${variant === 'row' ? 'thought-item-row' : ''}`} href={`#writing/${article.slug}`}>
      <article>
        <div className="thought-topline">
          <span>{article.category}</span>
          <time>{article.date}</time>
        </div>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <strong className="article-link">
          {article.status}
          <span aria-hidden="true">→</span>
        </strong>
      </article>
    </a>
  )
}

function ThoughtPreview() {
  const previewArticles = articles.slice(0, 3)

  return (
    <section className="frame section-block thoughts-band reveal" id="writing-preview" aria-labelledby="writing-title">
      <SectionHeader
        eyebrow="WRITING"
        title="工作思考与文章"
        description="文章已经从页面数据升级为 Markdown 文件。完整列表页支持按标题、分类、摘要和正文模糊搜索。"
      />
      <div className="thought-grid">
        {previewArticles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      <div className="section-action">
        <a className="primary-link" href="#writing">
          查看全部文章
          <span aria-hidden="true">→</span>
        </a>
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

function ShellNav({ current = 'home' }) {
  return (
    <nav className="nav" aria-label="主导航">
      <a className="wordmark" href="#top" aria-label="返回首页">
        XH<span>.</span>
      </a>
      <div className="nav-links">
        <a href={current === 'home' ? '#projects' : '#top'}>{current === 'home' ? '项目' : '首页'}</a>
        <a href="#writing">文章</a>
        <a href={current === 'home' ? '#about' : '#top'}>关于</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </nav>
  )
}

function WritingListPage() {
  const [query, setQuery] = React.useState('')
  const fuse = useMemo(() => new Fuse(articles, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'category', weight: 0.2 },
      { name: 'summary', weight: 0.25 },
      { name: 'content', weight: 0.15 },
    ],
    threshold: 0.36,
    ignoreLocation: true,
  }), [])
  const normalizedQuery = query.trim()
  const results = normalizedQuery ? fuse.search(normalizedQuery).map((result) => result.item) : articles

  return (
    <main className="page-shell writing-shell">
      <ShellNav current="writing" />
      <section className="frame article-index-page">
        <div className="article-index-head">
          <div>
            <span className="section-label">WRITING</span>
            <h1>工作思考与文章</h1>
            <p>集中查看所有 Markdown 文章，也可以按标题、分类、摘要和正文模糊搜索。</p>
          </div>
          <div className="article-count" aria-label="文章数量">
            <strong>{results.length}</strong>
            <span>/ {articles.length}</span>
          </div>
        </div>

        <label className="search-box">
          <span>搜索文章</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入关键词、分类或正文片段"
            autoComplete="off"
          />
        </label>

        <div className="article-index-list" aria-live="polite">
          {results.length > 0 ? (
            results.map((article) => <ArticleCard article={article} variant="row" key={article.slug} />)
          ) : (
            <p className="empty-state">没有找到匹配的文章。</p>
          )}
        </div>
      </section>
    </main>
  )
}

function cleanHeadingText(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~#]/g, '')
    .trim()
}

function getArticleOutline(content) {
  const headings = []
  const headingPattern = /^(#{2,4})\s+(.+)$/gm
  let match
  let isInCodeBlock = false

  content.split('\n').forEach((line) => {
    if (/^```/.test(line.trim())) {
      isInCodeBlock = !isInCodeBlock
      return
    }

    if (isInCodeBlock) return

    match = /^(#{2,4})\s+(.+)$/.exec(line)
    if (!match) return

    headings.push({
      id: `article-heading-${headings.length + 1}`,
      level: match[1].length,
      text: cleanHeadingText(match[2]),
    })
  })

  return headings
}

function getOutlineTree(headings) {
  const tree = []
  const stack = [{ level: 1, children: tree }]

  headings.forEach((heading) => {
    const node = { ...heading, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    stack[stack.length - 1].children.push(node)
    stack.push(node)
  })

  return tree
}

function ArticleOutline({ article, headings }) {
  const [collapsedItems, setCollapsedItems] = React.useState(() => new Set())

  if (headings.length === 0) return null

  const tree = getOutlineTree(headings)
  const hasCollapsibleItems = headings.some((heading) => heading.level < 4)

  const handleOutlineClick = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)

    if (!target) return

    const top = Math.max(target.getBoundingClientRect().top + window.scrollY - 36, 0)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const toggleItem = (id) => {
    setCollapsedItems((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  const collapseAll = () => {
    setCollapsedItems(new Set(headings.filter((heading) => heading.level < 4).map((heading) => heading.id)))
  }

  const expandAll = () => {
    setCollapsedItems(new Set())
  }

  const renderNode = (node) => {
    const isCollapsed = collapsedItems.has(node.id)
    const hasChildren = node.children.length > 0

    return (
      <li className={`outline-depth-${node.level}`} key={node.id}>
        <div className="outline-row">
          {hasChildren ? (
            <button
              type="button"
              className="outline-toggle"
              aria-label={`${isCollapsed ? '展开' : '收起'} ${node.text}`}
              aria-expanded={!isCollapsed}
              onClick={() => toggleItem(node.id)}
            >
              {isCollapsed ? '+' : '-'}
            </button>
          ) : (
            <span className="outline-toggle-placeholder" aria-hidden="true" />
          )}
          <a href={`#writing/${article.slug}`} onClick={(event) => handleOutlineClick(event, node.id)}>
            {node.text}
          </a>
        </div>
        {hasChildren && !isCollapsed ? <ol>{node.children.map(renderNode)}</ol> : null}
      </li>
    )
  }

  return (
    <aside className="article-outline" aria-label="文章大纲">
      <div className="outline-head">
        <span className="outline-label">OUTLINE</span>
        {hasCollapsibleItems ? (
          <div className="outline-actions" aria-label="大纲层级控制">
            <button type="button" onClick={expandAll}>展开</button>
            <button type="button" onClick={collapseAll}>收起</button>
          </div>
        ) : null}
      </div>
      <nav>
        <ol>
          {tree.map(renderNode)}
        </ol>
      </nav>
    </aside>
  )
}

function MermaidDiagram({ chart }) {
  const [svg, setSvg] = React.useState('')
  const [error, setError] = React.useState('')
  const diagramId = React.useId().replace(/:/g, '')

  useEffect(() => {
    let isMounted = true

    import('mermaid')
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: {
            background: '#fff8ec',
            primaryColor: '#f5efe6',
            primaryBorderColor: '#8b1a1a',
            primaryTextColor: '#2a1a0e',
            lineColor: '#8b1a1a',
            fontFamily: 'Noto Serif SC, Songti SC, SimSun, serif',
          },
        })

        return mermaid.render(`article-mermaid-${diagramId}`, chart)
      })
      .then((result) => {
        if (!isMounted) return
        setSvg(result.svg)
        setError('')
      })
      .catch((renderError) => {
        if (!isMounted) return
        setSvg('')
        setError(renderError.message || 'Mermaid 渲染失败')
      })

    return () => {
      isMounted = false
    }
  }, [chart, diagramId])

  if (error) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    )
  }

  return <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />
}

function ArticlePage({ article }) {
  if (!article) {
    return (
      <main className="page-shell article-shell">
        <ShellNav current="writing" />
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

  const outline = getArticleOutline(article.content)
  let renderedHeadingIndex = 0
  const getRenderedHeadingId = (fallbackPrefix) => {
    const heading = outline[renderedHeadingIndex]
    renderedHeadingIndex += 1

    return heading?.id || `${fallbackPrefix}-${renderedHeadingIndex}`
  }
  const markdownComponents = {
    h2({ children }) {
      return <h2 id={getRenderedHeadingId('article-heading')}>{children}</h2>
    },
    h3({ children }) {
      return <h3 id={getRenderedHeadingId('article-heading')}>{children}</h3>
    },
    h4({ children }) {
      return <h4 id={getRenderedHeadingId('article-heading')}>{children}</h4>
    },
    pre({ children }) {
      const child = React.Children.only(children)

      if (React.isValidElement(child) && child.props.className === 'language-mermaid') {
        return child
      }

      return <pre>{children}</pre>
    },
    code({ className, children, ...props }) {
      const language = /language-(\w+)/.exec(className || '')?.[1]
      const code = String(children).replace(/\n$/, '')

      if (language === 'mermaid') {
        return <MermaidDiagram chart={code} />
      }

      return <code className={className} {...props}>{children}</code>
    },
  }

  return (
    <main className="page-shell article-shell">
      <nav className="nav article-nav" aria-label="文章导航">
        <a className="wordmark" href="#top" aria-label="返回首页">
          XH<span>.</span>
        </a>
        <a className="back-link" href="#writing">返回文章列表</a>
      </nav>

      <div className="article-layout">
        <ArticleOutline article={article} headings={outline} />
        <article className="frame article-page">
          <div className="article-kicker">
            <span>{article.category}</span>
            <time>{article.date}</time>
          </div>
          <h1>{article.title}</h1>
          <p className="article-summary">{article.summary}</p>
          <div className="article-content">
            <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  )
}

function getRouteFromHash() {
  const hash = window.location.hash

  if (hash.startsWith('#writing/')) {
    return { page: 'article', slug: hash.replace(/^#writing\/?/, '') }
  }

  if (hash === '#writing') {
    return { page: 'writing-list', slug: '' }
  }

  return { page: 'home', slug: '' }
}

function App() {
  const [route, setRoute] = React.useState(getRouteFromHash)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash())

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
  }, [route.page, route.slug])

  if (route.page === 'article') {
    return <ArticlePage article={getArticleBySlug(route.slug)} />
  }

  if (route.page === 'writing-list') {
    return <WritingListPage />
  }

  return (
    <main className="page-shell">
      <ShellNav />

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
      <ThoughtPreview />
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
