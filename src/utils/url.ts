export function url(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

export function currentPath(): string {
  const path = '/' + window.location.pathname.slice(import.meta.env.BASE_URL.length)
  return path === '/index.html' ? '/' : path
}
