import { Buildings, Factory } from '@phosphor-icons/react/dist/ssr'

import { Logo } from '@/components/brand/Logo'

/**
 * Grafik zur Kernaussage „Der zweite Kanal zum Original“: Vom Hersteller führen zwei Wege zur
 * Einrichtung – der bestehende Bezug und der zusätzliche Kanal über HC. Die Linie über HC fließt
 * (CSS stroke-dashoffset auf wenigen kurzen Pfaden, kein Neuzeichnen großer Flächen).
 * Rein dekorativ; der Inhalt steht im Text daneben.
 */
export function HeroChannels({ tags }: { tags: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden aspect-[5/6] w-full max-w-[30rem] justify-self-end lg:block"
    >
      <svg viewBox="0 0 500 600" fill="none" className="absolute inset-0 h-full w-full">
        {/* bestehender Bezug: ruhig, gestrichelt */}
        <path
          d="M250 92 C 70 150, 70 450, 250 508"
          stroke="rgb(160 204 224 / 0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        {/* zweiter Kanal über HC: Grundlinie + fließender Lichtpunkt */}
        <path
          d="M250 92 C 420 160, 430 230, 390 300 C 350 370, 420 440, 250 508"
          stroke="rgb(34 199 189 / 0.35)"
          strokeWidth="2"
        />
        <path
          d="M250 92 C 420 160, 430 230, 390 300 C 350 370, 420 440, 250 508"
          stroke="#56dbd1"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="12 88"
          className="animate-[channel-flow_3.6s_linear_infinite] motion-reduce:animate-none"
        />
        <path
          d="M250 92 C 420 160, 430 230, 390 300 C 350 370, 420 440, 250 508"
          stroke="#56dbd1"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="6 94"
          className="animate-[channel-flow_3.6s_linear_infinite] opacity-60 [animation-delay:-1.8s] motion-reduce:animate-none"
        />
      </svg>

      {/* Knoten */}
      <div className="absolute top-[6%] left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/10 py-2 pr-5 pl-2 text-small text-white ring-1 ring-white/15 ring-inset">
        <span className="grid size-9 place-items-center rounded-full bg-white text-blue-950">
          <Factory weight="light" className="size-5" />
        </span>
        Hersteller · Original
      </div>

      <div className="absolute top-1/2 right-[2%] flex -translate-y-1/2 flex-col items-center gap-3">
        <span className="relative grid size-24 place-items-center rounded-full bg-signal shadow-[0_0_0_10px_rgb(34_199_189/0.12),0_0_0_22px_rgb(34_199_189/0.06)]">
          <Logo format="hoch" variant="strich" decorative className="h-14 w-auto" />
        </span>
        <span className="rounded-full bg-blue-950/80 px-3 py-1 text-caption text-teal-200 ring-1 ring-teal-300/30 ring-inset">
          Zweiter Kanal
        </span>
      </div>

      <div className="absolute top-1/2 left-[4%] -translate-y-1/2 rounded-full bg-blue-950/80 px-3 py-1 text-caption text-blue-200 ring-1 ring-white/10 ring-inset">
        Bestehender Bezug
      </div>

      <div className="absolute bottom-[6%] left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-small text-blue-950 shadow-lg">
        <span className="grid size-9 place-items-center rounded-full bg-blue-950 text-teal-300">
          <Buildings weight="light" className="size-5" />
        </span>
        Ihre Einrichtung
      </div>

      {/* Vorteile entlang des zweiten Kanals */}
      <ul className="absolute top-[24%] right-0 flex flex-col items-end gap-2">
        {tags.slice(0, 1).map((t) => (
          <li
            key={t}
            className="rounded-full bg-white/10 px-3 py-1 text-caption text-white ring-1 ring-white/15 ring-inset"
          >
            {t}
          </li>
        ))}
      </ul>
      <ul className="absolute right-0 bottom-[22%] flex flex-col items-end gap-2">
        {tags.slice(1, 3).map((t) => (
          <li
            key={t}
            className="rounded-full bg-white/10 px-3 py-1 text-caption text-white ring-1 ring-white/15 ring-inset"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
