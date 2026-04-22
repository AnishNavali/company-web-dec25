import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://equilibrate.ai'
  
  const routes = [
    '',
    '/about-us',
    '/careers',
    '/chatbot',
    '/contact-us',
    '/products',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
