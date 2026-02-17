'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Github, Linkedin, Globe, Send } from 'lucide-react';
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

export default function ContactPage() {
  const t = useTranslations('contact');

  // Build schema with translated messages
  const contactFormSchema = z.object({
    name: z.string().min(2, t('validation.nameMin')),
    email: z.string().email(t('validation.emailInvalid')),
    subject: z.string().min(3, t('validation.subjectMin')),
    message: z.string().min(10, t('validation.messageMin')),
  });

  useMetaTags({
    title: 'Contact Elad Ya\'akobovitch | Get In Touch',
    description: 'Get in touch with Elad Ya\'akobovitch for collaboration opportunities, project inquiries, or just to say hello.',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'website',
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const validation = contactFormSchema.safeParse(formData);

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
      } else if (result.fallback === 'mailto') {
        // Resend not configured - use mailto fallback
        const mailtoUrl = `mailto:${result.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.open(mailtoUrl, '_blank');
        toast.success(t('success'), {
          duration: 5000,
          position: 'bottom-center',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(t('error'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('info.email'),
      value: 'elad@hiteclearning.co.il',
      href: 'mailto:elad@hiteclearning.co.il',
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
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {t('title')}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t('subtitle')}
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full mt-8">
                {contactInfo.map((info, index) => (
                  <ScrollAnimate key={info.title} delay={index * 0.05}>
                    <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-secondary/50">
                      <info.icon className="h-8 w-8 text-primary" />
                      <h3 className="text-lg font-semibold">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
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
                  <div className="rounded-lg border bg-card p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">{t('form.title')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject" required>
                          {t('form.subject')}
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder={t('form.subjectPlaceholder')}
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          disabled={isSubmitting}
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
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
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
                    <SocialLink href="https://github.com/eladjak" icon={Github} label="GitHub Profile" />
                    <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="LinkedIn Profile" />
                    <SocialLink href="mailto:elad@hiteclearning.co.il" icon={Mail} label="Send Email" />
                    <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="Portfolio Website" />
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
