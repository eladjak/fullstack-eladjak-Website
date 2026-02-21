'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategory {
  titleKey: string;
  icon: string;
  skills: Skill[];
  span: string; // bento grid span
  gradient: string;
}

const skillCategories: SkillCategory[] = [
  {
    titleKey: 'frontend',
    icon: '🎨',
    span: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
    gradient: 'from-blue-500/15 to-cyan-500/15',
    skills: [
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Next.js', icon: '▲', color: '#000000' },
      { name: 'TypeScript', icon: '📘', color: '#3178C6' },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4' },
      { name: 'Framer Motion', icon: '🎬', color: '#FF0055' },
      { name: 'Three.js / R3F', icon: '🎮', color: '#049EF4' },
    ],
  },
  {
    titleKey: 'backend',
    icon: '⚙️',
    span: 'lg:col-span-2',
    gradient: 'from-emerald-500/15 to-green-500/15',
    skills: [
      { name: 'Node.js', icon: '🟢', color: '#339933' },
      { name: 'Supabase', icon: '⚡', color: '#3ECF8E' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
      { name: 'REST APIs', icon: '🔌', color: '#FF6B6B' },
      { name: 'GraphQL', icon: '◈', color: '#E10098' },
      { name: 'Prisma', icon: '△', color: '#2D3748' },
    ],
  },
  {
    titleKey: 'aiTools',
    icon: '🤖',
    span: 'lg:col-span-2',
    gradient: 'from-violet-500/15 to-purple-500/15',
    skills: [
      { name: 'OpenAI / GPT', icon: '🧠', color: '#412991' },
      { name: 'Claude AI', icon: '🤖', color: '#D97757' },
      { name: 'LangChain', icon: '🦜', color: '#1C3C3C' },
      { name: 'Git / GitHub', icon: '📦', color: '#181717' },
      { name: 'Docker', icon: '🐳', color: '#2496ED' },
      { name: 'Vercel', icon: '▲', color: '#000000' },
    ],
  },
  {
    titleKey: 'more',
    icon: '🚀',
    span: 'md:col-span-2 lg:col-span-2',
    gradient: 'from-amber-500/15 to-orange-500/15',
    skills: [
      { name: 'Angular', icon: '🅰️', color: '#DD0031' },
      { name: 'JavaScript', icon: '🟨', color: '#F7DF1E' },
      { name: 'HTML5 / CSS3', icon: '🌐', color: '#E34F26' },
      { name: 'Responsive Design', icon: '📱', color: '#7C3AED' },
      { name: 'SEO Optimization', icon: '📈', color: '#4285F4' },
      { name: 'Agile / Scrum', icon: '🔄', color: '#009688' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0.85 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0.85, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0.85, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
};

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const t = useTranslations('skills');

  const stats = [
    { value: '3+', label: t('stats.experience') },
    { value: '20+', label: t('stats.projects') },
    { value: '15+', label: t('stats.technologies') },
    { value: '100%', label: t('stats.satisfaction') },
  ];

  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        {/* Bento Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {skillCategories.map((category) => (
            <div
              key={category.titleKey}
              className={`relative group scroll-fade ${category.span}`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Decorative corner accent */}
                <div className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br ${category.gradient} opacity-50`} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-xl">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold">
                      {t(`categories.${category.titleKey}`)}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill relative transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5"
                      >
                        <div
                          className="px-3 py-2 rounded-xl bg-background/80 border border-border/50 hover:border-primary/50 transition-all duration-200 cursor-default"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{skill.icon}</span>
                            <span className="text-sm font-medium whitespace-nowrap">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-20 blur-md transition-opacity duration-300 -z-10"
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center scroll-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
