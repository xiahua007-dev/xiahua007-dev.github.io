import frontMatter from 'front-matter'
import { articlesIndex } from './generated/articlesIndex'

const articleContentModules = import.meta.glob('../content/writing/*.md', {
  query: '?raw',
  import: 'default',
})

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

export const articles = articlesIndex

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug)
}

export async function getArticleContent(slug) {
  const path = Object.keys(articleContentModules).find((modulePath) => slugFromPath(modulePath) === slug)

  if (!path) {
    return ''
  }

  const raw = await articleContentModules[path]()
  const { body } = frontMatter(raw)

  return body.trim()
}
