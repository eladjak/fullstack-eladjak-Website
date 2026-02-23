'use client';

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL',
  'Tailwind CSS', 'Framer Motion', 'OpenAI', 'Claude AI',
  'Docker', 'Vercel', 'GraphQL', 'Prisma', 'LangChain',
];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden py-6 bg-muted/20 border-y border-border/20 scroll-fade">
      <div className="animate-marquee flex w-max">
        <div className="flex shrink-0 items-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap select-none px-4"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-muted-foreground/50 whitespace-nowrap select-none px-4"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
