"use client";

import { motion } from "framer-motion";
import { Brain, Users, Leaf, Heart } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const serviceIcons = [Brain, Users, Leaf, Heart];

export function ServicesClient({ content: c }: { content: SiteContent }) {
  return (
    <div className="font-sans bg-bg text-fg">
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-16">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Nasıl Destek Olabilirim?
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
                Hizmetlerim
              </h1>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {c.services.map((s, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className="group rounded-[32px] border-2 border-primary/8 bg-bg p-8 shadow-sm hover:shadow-2xl transition-shadow duration-300 space-y-5 ring-1 ring-inset ring-primary/5"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-accent/15 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/25 transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-fg">
                      {s.title}
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed font-light">
                      {s.desc}
                    </p>
                    <div className="pt-4 border-t border-border/40 flex justify-between text-xs text-fg-muted font-semibold">
                      <span>{s.duration}</span>
                      <span className="text-primary uppercase tracking-wide">
                        {s.method}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
