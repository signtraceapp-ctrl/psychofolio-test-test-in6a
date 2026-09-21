"use client";

import type { SiteContent } from "@/lib/content";

export function FaqClient({ content: c }: { content: SiteContent }) {
  return (
    <div className="font-sans bg-bg text-fg">
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-14">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Aklınıza Takılanlar
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
                Soru ve Cevaplar
              </h1>
            </div>

            <div className="space-y-6">
              {c.faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-[28px] border-2 border-primary/8 bg-bg p-8 shadow-sm space-y-3"
                >
                  <h3 className="font-display text-lg font-bold text-fg flex items-start gap-2.5">
                    <span className="text-accent font-display text-2xl leading-none -mt-1">
                      S.
                    </span>{" "}
                    {item.q}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed pl-8 font-light">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
