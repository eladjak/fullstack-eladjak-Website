'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Github, Linkedin, Globe, Send } from 'lucide-react';
import { SocialLink } from '@/components/ui/social-link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMetaTags } from '@/hooks/useMetaTags';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  useMetaTags({
    title: 'Contact Elad Ya\'akobovitch | Get In Touch',
    description: 'Get in touch with Elad Ya\'akobovitch for collaboration opportunities, project inquiries, or just to say hello.',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'website'
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

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);

      // TODO: Send form data to backend

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 5000,
        position: 'bottom-center',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please fix the errors in the form');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'elad@hiteclearning.co.il',
      href: 'mailto:elad@hiteclearning.co.il',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Israel',
      href: null,
    },
    {
      icon: Clock,
      title: 'Availability',
      value: 'Open to opportunities',
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
                  Contact Me
                </h1>
                <h2 className="text-2xl font-semibold text-primary">
                  צור קשר
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Have a project in mind? Let's work together to create something amazing.
                  I'm always open to discussing new opportunities and ideas.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full mt-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-secondary/50"
                  >
                    <info.icon className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-500 hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-500">{info.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-2xl mt-12"
              >
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 text-center">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" required>
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" required>
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" required>
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" required>
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project or idea..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center space-y-4 mt-12"
              >
                <h3 className="text-xl font-semibold">Connect With Me</h3>
                <div className="flex space-x-4">
                  <SocialLink href="https://github.com/eladjak" icon={Github} label="GitHub Profile" />
                  <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="LinkedIn Profile" />
                  <SocialLink href="mailto:elad@hiteclearning.co.il" icon={Mail} label="Send Email" />
                  <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="Portfolio Website" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
