"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Quote,
  ArrowRight,
  Brain,
  Users,
  Leaf,
  Star,
} from "lucide-react";
import type { SiteContent } from "@/lib/content";

const serviceIcons = [Brain, Users, Leaf, Heart];

export function HomeClient({ content: c }: { content: SiteContent }) {
  return (
    <div className="font-sans selection:bg-primary/20 bg-bg text-fg">
      {/* Hero - split layout, warm editorial, sunset card */}
      <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-br from-bg via-bg-secondary/40 to-primary/10">
        {/* Ambient glow - bottom left warm accent */}
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-accent/15 to-transparent blur-[100px] pointer-events-none -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:col-span-7"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Heart className="h-3.5 w-3.5 fill-current" /> {c.home.badge}
              </span>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-fg leading-[0.95]">
                {c.home.headline}
                <br />
                <span className="text-primary italic font-semibold">
                  {c.home.headlineAccent}
                </span>{" "}
                {c.home.headlineSuffix}
              </h1>
              <p className="text-lg leading-relaxed text-fg-muted max-w-lg font-light">
                {c.home.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 rounded-[32px] px-8 py-3.5 text-sm font-medium shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-primary text-primary-fg hover:bg-primary-hover"
                >
                  {c.home.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/hakkimda"
                  className="inline-flex items-center justify-center rounded-[32px] px-8 py-3.5 text-sm font-medium border-2 border-primary/15 hover:bg-primary/5 transition-colors"
                >
                  Hakkımda
                </a>
              </div>
            </motion.div>

            {/* Photo frame card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="relative w-full max-w-[340px]">
                {/* Decorative background shape */}
                <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-primary/20 to-accent/20 blur-md -z-10" />

                <div className="overflow-hidden rounded-[32px] border-2 border-primary/10 bg-bg p-4 shadow-2xl">
                  <Image
                    src="/warm_hero.png"
                    alt="Sıcak terapi ortamı"
                    width={340}
                    height={425}
                    className="aspect-[4/5] w-full rounded-[24px] object-cover shadow-inner"
                    priority
                  />
                  <div className="mt-5 text-center space-y-2">
                    <p className="font-display font-bold text-fg text-xl">
                      {c.home.cardTitle}
                    </p>
                    <p className="text-xs text-fg-muted font-medium">
                      {c.home.cardSubtitle}
                    </p>
                  </div>
                </div>

                {/* Floating stat badge */}
                {c.metrics && c.metrics.length > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute -bottom-6 -left-6 rounded-2xl bg-bg border-2 border-primary/10 px-5 py-4 shadow-xl text-center"
                  >
                    <p className="font-display text-3xl font-bold text-primary">
                      {c.metrics[0].val}
                    </p>
                    <p className="text-[10px] text-fg-muted font-semibold tracking-wider uppercase mt-0.5">
                      {c.metrics[0].label}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial - full-width accent banner */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto text-center md:text-left">
            <Quote className="h-12 w-12 shrink-0 text-accent/40" />
            <div className="space-y-3">
              <p className="text-lg italic text-fg/80 leading-relaxed font-light">
                &ldquo;{c.home.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-fg-muted">
                  - {c.home.quoteAuthor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - card grid with icon hover */}
      <section className="py-32 bg-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center text-fg mb-16">
            Nasıl Destek Olabilirim?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {c.services.slice(0, 3).map((s, i) => {
              const Icon = serviceIcons[i] || Heart;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
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
      </section>

      {/* Stats - rounded cards row */}
      <section className="py-20 bg-bg-secondary/40 border-t border-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(c.metrics ?? []).map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="rounded-[24px] bg-bg border border-border/40 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-display text-4xl font-bold text-primary">
                  {m.val}
                </p>
                <p className="mt-2 text-xs font-semibold text-fg-muted uppercase tracking-wider">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
