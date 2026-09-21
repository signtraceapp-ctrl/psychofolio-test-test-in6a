import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { z } from "zod";

// ── Zod schema (all optional — validates buyer overrides in content.json) ──

const metin = z.string().max(5000);

const siteContentInputSchema = z.object({
  site: z
    .object({
      name: metin,
      title: metin,
      email: metin,
      phone: metin,
      address: metin,
      hours: metin,
      copyright: metin,
    })
    .partial()
    .optional(),

  home: z
    .object({
      badge: metin,
      headline: metin,
      headlineAccent: metin,
      headlineSuffix: metin,
      description: metin,
      cta: metin,
      cardTitle: metin,
      cardSubtitle: metin,
      quote: metin,
      quoteAuthor: metin,
    })
    .partial()
    .optional(),

  metrics: z
    .array(z.object({ val: metin, label: metin }))
    .optional(),

  services: z
    .array(
      z.object({ title: metin, desc: metin, duration: metin, method: metin }),
    )
    .optional(),

  about: z
    .object({
      title: metin,
      intro: metin,
      credentials: z.array(
        z.object({ year: metin, title: metin, detail: metin }),
      ),
      organizations: z.array(metin),
    })
    .partial()
    .optional(),

  approach: z
    .object({
      title: metin,
      intro: metin,
      principles: z.array(z.object({ title: metin, desc: metin })),
    })
    .partial()
    .optional(),

  articles: z
    .array(
      z.object({
        title: metin,
        category: metin,
        readTime: metin,
        date: metin,
      }),
    )
    .optional(),

  faq: z.array(z.object({ q: metin, a: metin })).optional(),

  contact: z
    .object({
      title: metin,
      intro: metin,
      formName: metin,
      formEmail: metin,
      formMessage: metin,
      formSubmit: metin,
    })
    .partial()
    .optional(),
});

// ── Resolved type (what pages consume — everything required) ──

export interface SeoData {
  jobTitle: string;
  description: string;
  specialties: string[];
  credentials: string[];
  location: string;
  socialLinks: string[];
  alumniOf?: string[];
  openingHours?: string;
  siteUrl?: string;
}

export interface SiteContent {
  site: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    address: string;
    hours?: string;
    copyright: string;
  };
  home: {
    badge: string;
    headline: string;
    headlineAccent: string;
    headlineSuffix: string;
    description: string;
    cta: string;
    cardTitle: string;
    cardSubtitle: string;
    quote: string;
    quoteAuthor: string;
  };
  metrics: { val: string; label: string }[];
  services: {
    title: string;
    desc: string;
    duration: string;
    method: string;
  }[];
  about: {
    title: string;
    intro: string;
    credentials: { year: string; title: string; detail: string }[];
    organizations?: string[];
  };
  approach: {
    title: string;
    intro: string;
    principles: { title: string; desc: string }[];
  };
  articles: {
    title: string;
    category: string;
    readTime: string;
    date: string;
  }[];
  faq: { q: string; a: string }[];
  contact: {
    title: string;
    intro: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
  seo?: SeoData;
}

// ── Merge helper (same pattern as serene) ──

function birlestir<T extends Record<string, unknown>>(
  varsayilan: T,
  gelen?: Partial<T>,
): T {
  if (!gelen) return varsayilan;
  const cikti = { ...varsayilan };
  for (const [k, v] of Object.entries(gelen)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    (cikti as Record<string, unknown>)[k] = v;
  }
  return cikti;
}

// ── Content loader ──

let cached: SiteContent | null = null;

export function getContent(): SiteContent {
  if (cached) return cached;

  // Defaults: site.json (always present, ships with the template)
  const defaultsPath = join(process.cwd(), "content", "site.json");
  const defaults: SiteContent = JSON.parse(
    readFileSync(defaultsPath, "utf-8"),
  );

  // Buyer overrides: content.json (empty {} by default, buyer fills what they want)
  const overridesPath = join(process.cwd(), "content", "content.json");
  if (existsSync(overridesPath)) {
    try {
      const raw = JSON.parse(readFileSync(overridesPath, "utf-8"));
      const parsed = siteContentInputSchema.safeParse(raw);

      if (parsed.success && Object.keys(parsed.data).length > 0) {
        const g = parsed.data;
        cached = {
          site: birlestir(defaults.site, g.site),
          home: birlestir(defaults.home, g.home),
          metrics:
            g.metrics && g.metrics.length > 0
              ? (g.metrics as SiteContent["metrics"])
              : defaults.metrics,
          services:
            g.services && g.services.length > 0
              ? (g.services as SiteContent["services"])
              : defaults.services,
          about: birlestir(defaults.about, g.about),
          approach: birlestir(defaults.approach, g.approach),
          articles:
            g.articles && g.articles.length > 0
              ? (g.articles as SiteContent["articles"])
              : defaults.articles,
          faq:
            g.faq && g.faq.length > 0
              ? (g.faq as SiteContent["faq"])
              : defaults.faq,
          contact: birlestir(defaults.contact, g.contact),
        };
        return cached;
      }
    } catch (e) {
      console.error(
        "[content] content.json gecersiz, varsayilanlar kullaniliyor:",
        e,
      );
    }
  }

  cached = defaults;
  return cached;
}
