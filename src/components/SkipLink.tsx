export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only rounded bg-ink px-4 py-2 text-surface focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      {label}
    </a>
  )
}
