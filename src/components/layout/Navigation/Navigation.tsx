import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="dark:text-yellow-400">
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
    </nav>
  )
}
