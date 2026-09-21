"use client";

import { useContactForm } from "@/lib/use-contact-form";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function ContactClient({ content: c }: { content: SiteContent }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="font-sans bg-bg text-fg">
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-14">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary font-display">
                Bana Ulaşın
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-fg">
                {c.contact.title}
              </h1>
            </div>

            {/* Split contact box */}
            <div className="rounded-[32px] border-2 border-primary/10 bg-bg p-8 md:p-12 shadow-sm grid gap-10 md:grid-cols-2">
              <div className="space-y-6 self-center">
                <h3 className="font-display text-2xl font-bold text-fg">
                  {c.contact.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed font-light">
                  {c.contact.intro}
                </p>

                <div className="space-y-3.5 text-sm text-fg-muted font-semibold">
                  {c.site.phone && (
                    <p className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary" /> {c.site.phone}
                    </p>
                  )}
                  <p className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" /> {c.site.email}
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" /> {c.site.address}
                  </p>
                </div>

                {c.site.hours && (
                  <div className="text-xs text-fg font-bold space-y-1.5 pt-2 border-t border-border/40 max-w-xs">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" /> {c.site.hours}
                    </p>
                  </div>
                )}
              </div>

              <div>
                {sent ? (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center space-y-4">
                    <p className="font-display text-xl font-bold text-fg">
                      Mesajınız iletildi.
                    </p>
                    <p className="text-sm text-fg-muted font-light">
                      En kısa sürede size dönüş yapılacaktır.
                    </p>
                  </div>
                ) : (
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const ad = (form.elements.namedItem("ad") as HTMLInputElement)?.value ?? "";
                      const eposta = (form.elements.namedItem("eposta") as HTMLInputElement)?.value ?? "";
                      const mesaj = (form.elements.namedItem("mesaj") as HTMLTextAreaElement)?.value ?? "";
                      const subject = encodeURIComponent("İletişim Formu");
                      const body = encodeURIComponent(`Ad: ${ad}\nE-posta: ${eposta}\n\n${mesaj}`);
                      window.location.href = `mailto:${c.site.email}?subject=${subject}&body=${body}`;
                      setSent(true);
                    }}
                  >
                    <input
                      name="ad"
                      type="text"
                      placeholder={c.contact.formName}
                      required
                      className="w-full rounded-2xl border-2 border-primary/8 bg-bg-secondary/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow duration-300"
                    />
                    <input
                      name="eposta"
                      type="email"
                      placeholder={c.contact.formEmail}
                      required
                      className="w-full rounded-2xl border-2 border-primary/8 bg-bg-secondary/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow duration-300"
                    />
                    <textarea
                      name="mesaj"
                      placeholder={c.contact.formMessage}
                      rows={4}
                      required
                      className="w-full rounded-2xl border-2 border-primary/8 bg-bg-secondary/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-shadow duration-300"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-2xl shadow-md py-3.5 bg-primary text-primary-fg hover:bg-primary-hover hover:scale-[1.02] transition-all duration-300 text-sm font-medium"
                    >
                      {c.contact.formSubmit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
