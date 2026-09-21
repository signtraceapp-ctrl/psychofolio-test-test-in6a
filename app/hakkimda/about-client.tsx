"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const defaultSpecialties = [
  "Şema Terapi (ISST Akredite)",
  "Çift & Aile Terapisi",
  "Çocuk Merkezli Oyun Terapisi",
  "EMDR Travma Terapisi",
];

export function AboutClient({ content: c }: { content: SiteContent }) {
  const specialties = (c.about.organizations && c.about.organizations.length > 0)
    ? c.about.organizations
    : defaultSpecialties;
  return (
    <div className="font-sans bg-bg text-fg">
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-16">
            <div className="space-y-4 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                Tanışalım
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
                {c.about.title}
              </h1>
            </div>

            {/* Two-column bio with editorial frames */}
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-6 text-base text-fg-muted leading-relaxed font-light">
                <p>{c.about.intro}</p>
                <p>
                  Terapide en önemli unsurun samimi ve güvenli bir bağ kurmak
                  olduğuna inanır, seanslarımı bu empati üzerine inşa ederim.
                </p>

                {/* Visual badge card */}
                <div className="p-6 rounded-[24px] bg-bg-secondary/40 border border-primary/5 shadow-sm space-y-2 mt-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Terapi Felsefem
                  </p>
                  <p className="text-sm italic text-fg-muted font-medium">
                    &ldquo;Büyüme, ancak güvenli bir bağlandığımız topraklarda
                    filizlenebilir.&rdquo;
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Uzmanlik Alanlari Custom box */}
                <div className="rounded-[28px] bg-accent/5 border border-accent/15 p-7 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">
                    Uzmanlık Alanları
                  </p>
                  <div className="space-y-3">
                    {specialties.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm text-fg font-medium"
                      >
                        <span className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline cards */}
                <div className="space-y-4">
                  {c.about.credentials.map((cred, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 items-start p-4 rounded-2xl bg-bg-secondary/20 border border-border/20"
                    >
                      <div className="shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {cred.year.length > 2
                          ? cred.year.slice(2)
                          : cred.year}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-fg">
                          {cred.title}
                        </p>
                        <p className="text-xs text-fg-muted mt-0.5">
                          {cred.detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
