import type { Metadata } from "next";
import { Source_Sans_3, Lora } from "next/font/google";
import { getContent } from "@/lib/content";
import Link from "next/link";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans-var",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display-var",
  style: ["normal", "italic"],
});

export function generateMetadata(): Metadata {
  const c = getContent();
  return {
    title: { default: `${c.site.name} - ${c.site.title}`, template: `%s | ${c.site.name}` },
    description: c.home.description,
    robots: { index: false, follow: false },
  };
}

const navLinks = [
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/yaklasim", label: "Yaklaşım" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const c = getContent();

  return (
    <html lang="tr" className={`${sourceSans.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg text-fg antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-display text-xl font-bold text-fg hover:text-primary transition-colors">
              {c.site.name}
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-fg-muted hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-bg-secondary/50 py-10">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-fg-muted sm:px-6 lg:px-8">
            <p className="font-display text-base font-bold text-fg">{c.site.name}</p>
            <p className="mt-1">{c.site.title}</p>
            <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} - {c.site.copyright}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
