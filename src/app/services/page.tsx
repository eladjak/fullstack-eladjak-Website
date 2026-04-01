'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Code2,
  GraduationCap,
  MessageCircle,
  Presentation,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const ChatFAQ = dynamic(
  () => import('@/components/ui/chat-faq').then((m) => m.ChatFAQ),
  { ssr: false }
);

const WHATSAPP_URL =
  'https://wa.me/972525427474?text=%D7%94%D7%99%D7%99%20%D7%90%D7%9C%D7%A2%D7%93%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%9C%20%D7%94%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D%20%D7%A9%D7%9C%D7%9A';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const serviceIcons = [Bot, Code2, GraduationCap, Presentation, MessageCircle] as const;
const serviceKeys = [
  'aiAutomation',
  'fullstack',
  'edtech',
  'workshops',
  'whatsappAutomation',
] as const;

const serviceColors = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-green-500 to-emerald-600',
] as const;

export default function ServicesPage() {
  const t = useTranslations('servicesPage');

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[50vh] flex items-center overflow-hidden pt-20">
          {/* Background image - using Next.js Image for optimization */}
          <Image
            src="/images/services-hero.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center z-0"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/15 via-accent/10 to-background" />
          <div className="absolute inset-0 bg-background/60 dark:bg-background/75 z-[1]" />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto space-y-6"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {t('badge')}
              </motion.span>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-glow">
                {t('title')}
              </h1>

              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:gap-10">
              {serviceKeys.map((key, index) => {
                const Icon = serviceIcons[index]!;
                const gradient = serviceColors[index]!;
                const isEven = index % 2 === 0;

                return (
                  <ScrollAnimate key={key} delay={index * 0.05}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 ${
                          isEven ? '' : 'md:flex-row-reverse'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h2 className="text-2xl font-bold">
                                {t(`services.${key}.title`)}
                              </h2>
                              <span className="inline-flex items-center rounded-full bg-cta/10 border border-cta/20 px-3 py-1 text-sm font-medium text-cta whitespace-nowrap">
                                {t(`services.${key}.price`)}
                              </span>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                              {t(`services.${key}.description`)}
                            </p>

                            {/* Features list */}
                            <ul className="grid gap-2 sm:grid-cols-2">
                              {[0, 1, 2, 3].map((featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span>
                                    {t(`services.${key}.features.${featureIndex}`)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollAnimate>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Chat Section */}
        <ChatFAQ />

        {/* Contact CTA Section */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-2xl pointer-events-none" />

          <div className="container px-4 md:px-6 relative">
            <ScrollAnimate>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  {t('cta.title')}
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  {t('cta.subtitle')}
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto mb-10">
                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="h-6 w-6" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                  <span className="text-sm text-muted-foreground">052-542-7474</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:eladhiteclearning@gmail.com"
                  aria-label="Send email to eladhiteclearning@gmail.com"
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{t('cta.email')}</span>
                  <span className="text-sm text-muted-foreground">eladhiteclearning@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+972525427474"
                  aria-label="Call 052-542-7474"
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{t('cta.phone')}</span>
                  <span className="text-sm text-muted-foreground">052-542-7474</span>
                </a>
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={0.2}>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-medium text-cta-foreground shadow-lg shadow-cta/25 hover:bg-cta/90 hover:shadow-xl hover:shadow-cta/30 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t('cta.contactForm')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </main>
    </div>
  );
}
