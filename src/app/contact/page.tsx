'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Github, Linkedin, Globe, Send, MessageCircle, Briefcase } from 'lucide-react';
import { SocialLink } from '@/components/ui/social-link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import toast from 'react-hot-toast';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type B2BFormData = {
  organization: string;
  role: string;
  orgSize: string;
  budget: string;
  projectType: string;
};

const ORG_SIZE_OPTIONS = [
  { value: '', label: 'בחר/י גודל ארגון' },
  { value: '1-10', label: '1-10 עובדים' },
  { value: '11-50', label: '11-50 עובדים' },
  { value: '51-200', label: '51-200 עובדים' },
  { value: '200+', label: '200+ עובדים' },
] as const;

const BUDGET_OPTIONS = [
  { value: '', label: 'בחר/י תקציב משוער' },
  { value: 'עד 30K', label: 'עד ₪30K' },
  { value: '30K-100K', label: '₪30K-100K' },
  { value: '100K-300K', label: '₪100K-300K' },
  { value: '300K+', label: '₪300K+' },
] as const;

const PROJECT_TYPE_OPTIONS = [
  { value: '', label: 'בחר/י סוג פרויקט' },
  { value: 'יישום AI', label: 'יישום AI' },
  { value: 'ייעוץ אסטרטגי', label: 'ייעוץ אסטרטגי' },
  { value: 'סדנת הדרכה', label: 'סדנת הדרכה' },
  { value: 'אחר', label: 'אחר' },
] as const;

function ContactPageInner() {
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const isB2B = searchParams.get('type') === 'b2b';

  // Build schema with translated messages
  const contactFormSchema = z.object({
    name: z.string().min(2, t('validation.nameMin')),
    email: z.string().email(t('validation.emailInvalid')),
    subject: z.string().min(3, t('validation.subjectMin')),
    message: z.string().min(10, t('validation.messageMin')),
  });

  useMetaTags({
    title: isB2B
      ? "פנייה ארגונית | אלעד יעקובוביץ' - מפתח Full-Stack"
      : "צור קשר | אלעד יעקובוביץ' - מפתח Full-Stack",
    description: isB2B
      ? "פנייה ארגונית לאלעד יעקובוביץ' - יישומי AI, ייעוץ אסטרטגי וסדנאות הדרכה לארגונים."
      : "צרו קשר עם אלעד יעקובוביץ' לשיתופי פעולה, פרויקטים חדשים או ייעוץ טכנולוגי. תגובה תוך מספר שעות.",
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'website',
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [b2bData, setB2bData] = useState<B2BFormData>({
    organization: '',
    role: '',
    orgSize: '',
    budget: '',
    projectType: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill the message body when entering B2B mode (only if untouched)
  useEffect(() => {
    if (isB2B && formData.message === '') {
      setFormData((prev) => ({
        ...prev,
        message: 'פנייה ארגונית — שמתי עין על פרויקט מסוג [סוג הפרויקט]…',
      }));
    }
    // We intentionally only run this when isB2B flips
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isB2B]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleB2BChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setB2bData((prev) => ({ ...prev, [name]: value }));
  };

  const buildFinalMessage = (): string => {
    if (!isB2B) return formData.message;
    const header = '[פנייה ארגונית]';
    const lines = [
      header,
      `ארגון: ${b2bData.organization || '-'}`,
      `תפקיד: ${b2bData.role || '-'}`,
      `גודל: ${b2bData.orgSize || '-'}`,
      `תקציב: ${b2bData.budget || '-'}`,
      `סוג פרויקט: ${b2bData.projectType || '-'}`,
      '',
      formData.message,
    ];
    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const finalMessage = buildFinalMessage();
    const payload: ContactFormData = {
      name: formData.name,
      email: formData.email,
      subject: isB2B && formData.subject === '' ? 'פנייה ארגונית' : formData.subject,
      message: finalMessage,
    };

    const validation = contactFormSchema.safeParse(payload);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error(t('validationError'));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t('success'), {
          duration: 5000,
          position: 'bottom-center',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setB2bData({ organization: '', role: '', orgSize: '', budget: '', projectType: '' });
      } else if (result.fallback === 'mailto') {
        const mailtoUrl = `mailto:${result.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`)}`;
        window.open(mailtoUrl, '_blank');
        toast.success(t('success'), {
          duration: 5000,
          position: 'bottom-center',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setB2bData({ organization: '', role: '', orgSize: '', budget: '', projectType: '' });
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        title: t('info.email'),
        value: 'eladhiteclearning@gmail.com',
        href: 'mailto:eladhiteclearning@gmail.com',
      },
      {
        icon: MessageCircle,
        title: 'WhatsApp',
        value: '052-542-7474',
        href: 'https://wa.me/972525427474',
      },
      {
        icon: MapPin,
        title: t('info.location'),
        value: t('info.locationValue'),
        href: null,
      },
      {
        icon: Clock,
        title: t('info.availability'),
        value: t('info.availabilityValue'),
        href: null,
      },
    ],
    [t]
  );

  // B2B accent uses cyan/blue (subtle); default keeps the existing rose primary
  const heroTitle = isB2B ? 'פנייה ארגונית' : t('title');
  const heroSubtitle = isB2B
    ? 'מתעניינים בפתרון AI, ייעוץ אסטרטגי או סדנת הדרכה לארגון? מלאו את הפרטים ואחזור אליכם תוך מספר שעות.'
    : t('subtitle');

  // Native select base classes — match Input look
  const selectClass = [
    'flex w-full rounded-md border bg-background px-3 py-2',
    'text-sm ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    isB2B
      ? 'border-cyan-500/40 focus-visible:ring-cyan-500'
      : 'border-input focus-visible:ring-ring',
  ].join(' ');

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-glow">
                  {heroTitle}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {heroSubtitle}
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-6 grid-cols-2 md:grid-cols-4 max-w-4xl w-full mt-8">
                {contactInfo.map((info, index) => (
                  <ScrollAnimate key={info.title} delay={index * 0.05}>
                    <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-secondary/50 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 border border-transparent">
                      <info.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                      <h3 className="text-lg font-semibold">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                          aria-label={`${info.title}: ${info.value}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </ScrollAnimate>
                ))}
              </div>

              {/* Contact Form */}
              <ScrollAnimate delay={0.1}>
                <div className="w-full max-w-2xl mt-12">
                  <div
                    className={[
                      'rounded-lg border bg-card p-8 shadow-sm backdrop-blur-sm',
                      isB2B ? 'border-cyan-500/30 shadow-cyan-500/5' : '',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-center">
                        {isB2B ? 'פנייה ארגונית' : t('form.title')}
                      </h2>
                      {isB2B && (
                        <span
                          className="inline-flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-600 dark:text-cyan-400"
                          aria-label="פנייה ארגונית"
                        >
                          <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                          B2B
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground text-center mb-6">
                      {t('form.responseTime')}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      {/* B2B-specific fields appear ABOVE the standard fields */}
                      {isB2B && (
                        <motion.div
                          initial={{ opacity: 0, transform: 'translateY(-8px)' }}
                          animate={{ opacity: 1, transform: 'translateY(0px)' }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="space-y-6 rounded-md border border-cyan-500/20 bg-cyan-500/5 p-4 text-start"
                        >
                          <div>
                            <Label htmlFor="organization">שם הארגון</Label>
                            <Input
                              id="organization"
                              name="organization"
                              type="text"
                              placeholder="לדוגמה: חברת XYZ בע״מ"
                              value={b2bData.organization}
                              onChange={handleB2BChange}
                              disabled={isSubmitting}
                              autoComplete="organization"
                            />
                          </div>

                          <div>
                            <Label htmlFor="role">תפקיד</Label>
                            <Input
                              id="role"
                              name="role"
                              type="text"
                              placeholder="CEO / CTO / PM / Head of Engineering"
                              value={b2bData.role}
                              onChange={handleB2BChange}
                              disabled={isSubmitting}
                              autoComplete="organization-title"
                            />
                          </div>

                          <div>
                            <Label htmlFor="orgSize">גודל ארגון</Label>
                            <select
                              id="orgSize"
                              name="orgSize"
                              value={b2bData.orgSize}
                              onChange={handleB2BChange}
                              disabled={isSubmitting}
                              className={selectClass}
                            >
                              {ORG_SIZE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label htmlFor="budget">תקציב משוער</Label>
                            <select
                              id="budget"
                              name="budget"
                              value={b2bData.budget}
                              onChange={handleB2BChange}
                              disabled={isSubmitting}
                              className={selectClass}
                            >
                              {BUDGET_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label htmlFor="projectType">סוג פרויקט</Label>
                            <select
                              id="projectType"
                              name="projectType"
                              value={b2bData.projectType}
                              onChange={handleB2BChange}
                              disabled={isSubmitting}
                              className={selectClass}
                            >
                              {PROJECT_TYPE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <Label htmlFor="name" required>
                          {t('form.name')}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder={t('form.namePlaceholder')}
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          disabled={isSubmitting}
                          required
                          aria-required="true"
                          autoComplete="name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" required>
                          {t('form.email')}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          disabled={isSubmitting}
                          required
                          aria-required="true"
                          autoComplete="email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" required={!isB2B}>
                          {t('form.subject')}
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder={isB2B ? 'פנייה ארגונית' : t('form.subjectPlaceholder')}
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          disabled={isSubmitting}
                          required={!isB2B}
                          aria-required={!isB2B}
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" required>
                          {t('form.message')}
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t('form.messagePlaceholder')}
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          disabled={isSubmitting}
                          required
                          aria-required="true"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full hover:scale-105 transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin me-2">⏳</span>
                            {t('form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 me-2" />
                            {t('form.send')}
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Social Links */}
              <ScrollAnimate delay={0.15}>
                <div className="flex flex-col items-center space-y-4 mt-12">
                  <h3 className="text-xl font-semibold">{t('connect')}</h3>
                  <div className="flex gap-4">
                    <SocialLink href="https://github.com/eladjak" icon={Github} label="פרופיל GitHub" />
                    <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="פרופיל LinkedIn" />
                    <SocialLink href="mailto:eladhiteclearning@gmail.com" icon={Mail} label="שליחת אימייל" />
                    <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="אתר תיק עבודות" />
                  </div>
                </div>
              </ScrollAnimate>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh" aria-hidden="true" />}>
      <ContactPageInner />
    </Suspense>
  );
}
