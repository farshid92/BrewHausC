export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-[1100px] scroll-mt-16 px-4 pt-12 pb-12 sm:px-6 md:pt-20 md:pb-16">
      <p className="mb-4 text-xs tracking-[0.15em] text-clay uppercase">
        Roasted weekly · Shipped worldwide
      </p>
      <h1 className="max-w-xl text-4xl leading-[1.05] font-bold sm:text-5xl md:text-6xl">
        Coffee worth <span className="text-ember">getting up</span> for.
      </h1>
      <p className="mt-5 max-w-lg text-base text-ink-soft sm:text-lg">
        Single-origin beans and the equipment to do them justice.
        No over extraction, no under extraction, just good coffee.
      </p>
      <a
        href="#shop"
        className="mt-8 inline-block rounded-full bg-ember px-7 py-3 font-semibold text-white transition hover:-translate-y-px hover:bg-[#a5431f]"
      >
        Shop the beans
      </a>
    </section>
  )
}