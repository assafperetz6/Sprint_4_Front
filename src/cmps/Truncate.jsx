export function Truncate({ children }) {
  if (!children) return null
  // console.log(children)
  const words = children.split(' ')
  const firstWord = words[0]
  const truncated = firstWord.length > 10 ? firstWord.slice(0, 10) + '...' : firstWord + '...'
  return <span aria-label={children}>{truncated}</span>
}
