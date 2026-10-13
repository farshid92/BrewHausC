export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <nav className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#hero" className="text-lg font-bold sm:text-xl">
          Brew<span className="text-ember">Haus</span>
        </a>
        <ul className="flex gap-4 text-sm sm:gap-6 sm:text-base">
          <li className="hidden sm:block"><a href="#hero"className="text-ink-soft transition-colors hover:text-ember">Home</a></li>
          <li><a href="#shop" className="text-ink-soft transition-colors hover:text-ember">Shop</a></li>
          <li><a href="#about" className="text-ink-soft transition-colors hover:text-ember">About</a></li>
          <li><a href="#contact" className="text-ink-soft transition-colors hover:text-ember">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}