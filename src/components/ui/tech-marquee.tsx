'use client';

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL',
  'Tailwind CSS', 'Framer Motion', 'Three.js', 'OpenAI', 'Claude AI',
  'Docker', 'Vercel', 'GraphQL', 'Prisma', 'LangChain',
];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden py-6 bg-muted/20 border-y border-border/20">
      <div className="relative flex">
        <div className="animate-marquee flex shrink-0 gap-8 items-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap select-none"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 gap-8 items-center" aria-hidden="true">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
