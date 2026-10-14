export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col gap-12 p-[clamp(24px,6vw,96px)]">
      <main className="flex max-w-[920px] flex-1 flex-col justify-center gap-9">
        <p className="-mb-1.5 text-[length:clamp(18px,1.6vw,21px)] text-[#595959]">
          Hi, I’m Kevin.
        </p>
        <h1 className="text-[length:clamp(36px,5.4vw,72px)] leading-[1.05] font-medium tracking-[-0.03em]">
          I build tools that make everyday things easier.
        </h1>
        <p className="max-w-[580px] text-[length:clamp(18px,1.6vw,21px)] leading-[1.55] text-[#4A4A4A]">
          For more than twelve years I’ve been making websites, apps and tools
          for people and businesses. Have something in mind? I’d love to hear
          about it.
        </p>
        <a
          href="mailto:kevintraver@kevintraver.com"
          className="inline-flex min-h-14 items-center gap-3 self-start rounded-full bg-[#1D4ED8] px-7 text-lg font-medium text-white transition-colors hover:bg-[#1E3A8A]"
        >
          Get in touch
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
      </main>
      <footer className="text-sm text-[#595959]">
        © {new Date().getFullYear()} Kevin Traver
      </footer>
    </div>
  );
}
