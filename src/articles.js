import frontMatter from 'front-matter'

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
    const { attributes, body } = frontMatter(raw)

    return {
      slug: slugFromPath(path),
      content: body.trim(),
      ...attributes,
    }
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug)
}
