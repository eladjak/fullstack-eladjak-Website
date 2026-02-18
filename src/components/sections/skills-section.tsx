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
}

const skillCategories: SkillCategory[] = [
  {
    titleKey: 'frontend',
    icon: '🎨',
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

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.titleKey}
              variants={categoryVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold">
                    {t(`categories.${category.titleKey}`)}
                  </h3>
                </div>

                <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group/skill relative"
                    >
                      <div
                        className="px-3 py-2 rounded-lg bg-background/80 border border-border/50 hover:border-primary/50 transition-all duration-200 cursor-default"
                        style={{
                          boxShadow: `0 0 0 0 ${skill.color}20`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{skill.icon}</span>
                          <span className="text-sm font-medium whitespace-nowrap">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                      {/* Hover glow effect */}
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover/skill:opacity-30 blur-md transition-opacity duration-300 -z-10"
                        style={{ backgroundColor: skill.color }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0.85, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0.85, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
