import { useEffect } from 'react'

const goatCounterCode = 'xiahua007'

export default function Analytics() {
  useEffect(() => {
    if (!goatCounterCode || !/^[a-z0-9-]+$/i.test(goatCounterCode)) return undefined

    let script = document.querySelector('script[data-goatcounter]')

    if (!script) {
      script = document.createElement('script')
      script.async = true
      script.src = 'https://gc.zgo.at/count.js'
      script.dataset.goatcounter = `https://${goatCounterCode}.goatcounter.com/count`
      document.head.appendChild(script)
    }

    const trackHashNavigation = () => {
      window.goatcounter?.count?.({
        path: `${window.location.pathname}${window.location.hash}`,
        title: document.title,
      })
    }

    window.addEventListener('hashchange', trackHashNavigation)
    return () => window.removeEventListener('hashchange', trackHashNavigation)
  }, [])

  return null
}
