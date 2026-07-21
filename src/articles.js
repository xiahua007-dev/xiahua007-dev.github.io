import matter from 'gray-matter'

const articleModules = import.meta.glob('../content/writing/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

export const articles = Object.entries(articleModules)
  .map(([path, raw]) => {
    const { data, content } = matter(raw)

    return {
      slug: slugFromPath(path),
      content: content.trim(),
      ...data,
    }
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug)
}
