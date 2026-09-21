"use client";

import type { SiteContent } from "@/lib/content";

export function ApproachClient({ content: c }: { content: SiteContent }) {
  return (
    <div className="font-sans bg-bg text-fg">
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-14">
            <div className="space-y-4 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary font-display">
                Yol Haritamız
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
                {c.approach.title}
              </h1>
            </div>

            <p className="text-lg text-fg-muted leading-relaxed font-light">
              {c.approach.intro}
            </p>

            {/* Numbered cards redesign */}
            <div className="rounded-[32px] border-2 border-primary/10 bg-bg p-8 md:p-12 shadow-sm space-y-10">
              {c.approach.principles.map((p, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-lg">
                    {i + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-fg">
                      {p.title}
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
