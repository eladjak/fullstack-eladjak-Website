"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface GuideSection {
  id: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  content: string[];
  tips?: string[];
}

const sections: GuideSection[] = [
  {
    id: "what-is",
    emoji: "🤖",
    title: "מה זה Claude Code?",
    description:
      "כלי פיתוח מבוסס AI שפועל ישירות מהטרמינל. הוא קורא קבצים, כותב קוד, מריץ פקודות ומחפש באינטרנט - הכל מתוך שיחה טבעית.",
    color: "from-violet-600 to-purple-500",
    content: [
      "Claude Code הוא סוכן AI אוטונומי של Anthropic שמבין את הפרויקט שלך לעומק",
      "הוא עובד ישירות בטרמינל - לא צריך IDE מיוחד",
      "יכול לקרוא, לכתוב ולערוך קבצים, להריץ טסטים, ולבצע Git operations",
      "תומך ב-MCP (Model Context Protocol) לחיבור לשירותים חיצוניים",
      "יש לו מערכת Skills שמרחיבה את היכולות שלו ב-230+ מיומנויות",
    ],
    tips: [
      "Claude Code שונה מ-ChatGPT - הוא לא רק עונה על שאלות, הוא באמת עובד על הקוד שלך",
      "הוא יכול לנהל פרויקטים שלמים מאפס ועד לפרודקשן",
    ],
  },
  {
    id: "install",
    emoji: "⚡",
    title: "התקנה מהירה",
    description:
      "5 דרכים להתקין את Claude Code - בחר את מה שמתאים לך.",
    color: "from-emerald-600 to-teal-500",
    content: [
      "npm install -g @anthropic-ai/claude-code  →  התקנה גלובלית דרך npm",
      "אפליקציית Desktop  →  claude.com/download (Windows / Mac / Linux)",
      "VS Code Extension  →  חפש 'Claude Code' ב-Extensions",
      "JetBrains Plugin  →  זמין ל-WebStorm, IntelliJ, PyCharm",
      "גישה דרך הדפדפן  →  claude.com/code",
    ],
    tips: [
      "מומלץ להתחיל עם ה-CLI (שורת הפקודה) לחוויה המלאה",
      "צריך מנוי Anthropic - Pro ($20/חודש) או Max ($100/חודש)",
    ],
  },
  {
    id: "first-steps",
    emoji: "🚀",
    title: "צעדים ראשונים",
    description: "איך מתחילים לעבוד עם Claude Code? הנה הצעדים הבסיסיים.",
    color: "from-purple-600 to-violet-500",
    content: [
      "פתח טרמינל בתיקיית הפרויקט שלך",
      "הקלד claude ולחץ Enter",
      "תאר מה אתה רוצה לבנות בשפה טבעית (עברית או אנגלית)",
      "Claude יקרא את הקבצים, יבין את המבנה, ויתחיל לעבוד",
      "אשר או דחה כל פעולה שהוא מציע",
    ],
    tips: [
      "הקלד /init בפעם הראשונה כדי ליצור קובץ CLAUDE.md עם הגדרות הפרויקט",
      "השתמש ב-/help לרשימת פקודות מלאה",
      "הקלד /cost לבדוק כמה טוקנים השתמשת",
    ],
  },
  {
    id: "claude-md",
    emoji: "📋",
    title: "קובץ CLAUDE.md",
    description:
      "הקובץ הכי חשוב - כאן אתה מלמד את Claude איך אתה עובד. זה כמו מדריך אישי שנטען בכל שיחה.",
    color: "from-amber-600 to-orange-500",
    content: [
      "CLAUDE.md הוא קובץ הגדרות שנטען אוטומטית בכל session",
      "מכיל: כללי פרויקט, סגנון קוד, כלים מועדפים, ועוד",
      "אפשר ליצור CLAUDE.md גלובלי (~/.claude/CLAUDE.md) ו/או לכל פרויקט",
      "Claude קורא אותו כדי להבין את ההעדפות שלך ולעקוב אחריהן",
      "דוגמה: 'תשתמש רק ב-bun ולא ב-npm' או 'כתוב הודעות commit בעברית'",
    ],
    tips: [
      "ככל שה-CLAUDE.md שלך מפורט יותר, כך Claude עובד טוב יותר",
      "אל תפחד לעדכן אותו - Claude לומד מההעדפות שלך",
    ],
  },
  {
    id: "skills",
    emoji: "🧩",
    title: "Skills - מיומנויות",
    description:
      "Skills הם קבצי הוראות שמרחיבים את היכולות של Claude. כמו אפליקציות למכשיר - כל Skill מוסיף יכולת חדשה.",
    color: "from-rose-600 to-pink-500",
    content: [
      "Skills נמצאים בתיקייה ~/.claude/skills/",
      "כל Skill הוא תיקייה עם קובץ SKILL.md שמכיל הוראות מפורטות",
      "יש 230+ Skills זמינים - מ-React ועד ביטוח לאומי",
      "התקנה: npx skills add <repo/skill-name> -y -g",
      "Claude טוען Skills רלוונטיים אוטומטית לפי ההקשר",
    ],
    tips: [
      "יש לנו Skill Registry MCP שממליץ על ה-Skill הנכון לכל משימה",
      "אפשר ליצור Skills מותאמים אישית לפרויקט שלך",
    ],
  },
  {
    id: "mcp",
    emoji: "🔌",
    title: "MCP - חיבור לעולם",
    description:
      "Model Context Protocol הוא הסטנדרט לחיבור AI לכלים חיצוניים. MCP הופך את Claude מ'מוח' ל'גוף' שיכול לפעול בעולם.",
    color: "from-teal-600 to-cyan-500",
    content: [
      "MCP Servers חושפים כלים ש-Claude יכול להשתמש בהם",
      "דוגמאות: Playwright (גלישה באינטרנט), GitHub, Slack, PowerPoint",
      "ההגדרות בקובץ ~/.claude/.mcp.json",
      "כל MCP Server רץ כתהליך נפרד ומתקשר עם Claude",
      "אפשר לפתח MCP Servers מותאמים - זה TypeScript/Node.js פשוט",
    ],
    tips: [
      "Playwright MCP חדש ומדהים - גולש דרך עץ נגישות במקום צילומי מסך",
      "Context7 MCP מביא תיעוד עדכני של ספריות ישירות ל-Claude",
    ],
  },
  {
    id: "agents",
    emoji: "🤝",
    title: "Multi-Agent - צוות סוכנים",
    description:
      "למה להסתפק בסוכן אחד? Claude Code יכול להריץ צוות שלם של סוכנים מתמחים שעובדים במקביל.",
    color: "from-indigo-600 to-blue-500",
    content: [
      "oh-my-claudecode (OMC) - מערכת אורקסטרציה עם 32 סוכנים מתמחים",
      "סוכנים: architect, executor, security-reviewer, test-engineer ועוד",
      "מצבי עבודה: team (צוות), autopilot (אוטונומי), ralph (התמדה)",
      "אפשר להריץ 6+ סוכנים במקביל על משימות שונות",
      "כל סוכן מקבל הקשר ייעודי וכלים מוגבלים לתפקידו",
    ],
    tips: [
      "Jim Prosser (יועץ תקשורת, לא מתכנת) בנה מערכת 'מנהל לשכה' שלם עם 6 סוכנים ב-36 שעות",
      "הסוד הוא בארכיטקטורה - לא בקוד. חשיבה מערכתית > הנדסת תוכנה",
    ],
  },
  {
    id: "workflows",
    emoji: "🔄",
    title: "Workflows - תהליכי עבודה",
    description: "תהליכים מוכחים שחוסכים שעות עבודה כל יום.",
    color: "from-violet-600 to-purple-500",
    content: [
      "TDD (Test-Driven Development) - כתוב טסט → הרץ (אדום) → כתוב קוד → הרץ (ירוק)",
      "Security Scan - סרוק את כל הפרויקט לפגיעויות אבטחה",
      "Code Review - סקירת קוד אוטומטית עם 3 סוקרים מתמחים",
      "Overnight Work - שלח משימות ל-Copilot לפני השינה, קבל PR בבוקר",
      "UI Design → Code - עצב ב-Stitch, קבל קוד, Claude מוסיף לוגיקה",
    ],
  },
  {
    id: "tips",
    emoji: "💡",
    title: "טיפים מתקדמים",
    description: "טריקים שיהפכו אותך לאלוף.",
    color: "from-yellow-600 to-amber-500",
    content: [
      "ultrathink - כתוב את המילה בפרומפט להפעלת מצב חשיבה מעמיקה (ותראה צבע קשת!)",
      "LSP Integration - קוד חכם 900x יותר מהיר מ-grep, אפס false positives",
      "Gemini Image Generation - ייצר תמונות AI בחינם עם nano-banana-poster",
      "שלב כמה AIs: Claude לקוד, v0.dev ל-UI, Gemini לתמונות, Copilot לעבודת לילה",
      "CLAUDE.md גלובלי + CLAUDE.md לפרויקט = Claude שמכיר אותך ואת הפרויקט",
    ],
  },
];

const resources = [
  {
    title: "מדריך Claude Code בעברית",
    description: "מדריך מקיף ומעודכן בעברית מאת Tom Hagiladi",
    href: "https://tomhagiladi.github.io/claude-code-guide/",
    emoji: "📖",
  },
  {
    title: "Ultimate AI Dev Environment",
    description: "230+ Skills, 11 MCP Servers, 15 Agents",
    href: "https://github.com/eladjak/ultimate-ai-dev-environment",
    emoji: "🚀",
  },
  {
    title: "AI Agent Skills Repository",
    description: "210+ Skills מוכנים להתקנה",
    href: "https://github.com/eladjak/ai-agents-skills",
    emoji: "🧩",
  },
  {
    title: "Claude Code Docs (Anthropic)",
    description: "התיעוד הרשמי מ-Anthropic",
    href: "https://docs.anthropic.com/en/docs/claude-code",
    emoji: "📚",
  },
  {
    title: "Israeli Skills Library",
    description: "92 סקילים ישראליים - מס, ביטוח לאומי, בנקאות ועוד",
    href: "https://agentskills.co.il",
    emoji: "🇮🇱",
  },
];

const tocLabels: { id: string; label: string }[] = [
  { id: "what-is", label: "מה זה?" },
  { id: "install", label: "התקנה" },
  { id: "first-steps", label: "צעדים ראשונים" },
  { id: "claude-md", label: "CLAUDE.md" },
  { id: "skills", label: "Skills" },
  { id: "mcp", label: "MCP" },
  { id: "agents", label: "Agents" },
  { id: "workflows", label: "Workflows" },
  { id: "tips", label: "טיפים" },
];

export default function ClaudeCodePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <main className="min-h-dvh bg-background" dir="rtl">
      {/* Sticky TOC pill bar */}
      <div className="sticky top-16 z-30 py-2 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 bg-background/70 backdrop-blur-md border border-border/50 rounded-2xl px-4 py-2 shadow-sm">
            {tocLabels.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedSection(item.id);
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1 rounded-full hover:bg-primary/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-heebo">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                Claude Code
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground">
                המדריך המלא לפיתוח עם AI
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              איך להפוך את Claude Code למנוע הפיתוח שלך - מהתקנה ועד מערכות
              מרובות סוכנים. 230+ מיומנויות, 11 שרתי MCP, וכל מה שצריך כדי
              לבנות תוכנה ב-2026.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { label: "Skills", value: "230+" },
              { label: "MCP Servers", value: "11" },
              { label: "Agents", value: "32" },
              { label: "מהירות LSP", value: "900x" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full text-right"
              >
                <div
                  className={`group bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 ${
                    expandedSection === section.id
                      ? "ring-2 ring-primary/30 shadow-lg shadow-primary/5 border-primary/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl shrink-0 shadow-sm shadow-primary/20`}
                    >
                      {section.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground font-heebo">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {section.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedSection === section.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground shrink-0"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-muted/30 rounded-b-2xl border border-t-0 border-border p-6 -mt-2">
                      <p className="text-muted-foreground mb-4">
                        {section.description}
                      </p>
                      <ul className="space-y-3">
                        {section.content.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-foreground/90"
                          >
                            <span className="text-primary mt-1 shrink-0">
                              &#x2022;
                            </span>
                            <span className="text-sm leading-relaxed">
                              {item.includes("→") ? (
                                <>
                                  <span className="bg-card/80 rounded-lg px-2 py-0.5 font-mono text-xs border border-border/50 ml-1">
                                    {item.split("→")[0].trim()}
                                  </span>
                                  <span className="text-muted-foreground mx-1">→</span>
                                  {item.split("→").slice(1).join("→").trim()}
                                </>
                              ) : (
                                item
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {section.tips && (
                        <div className="mt-6 bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                          <p className="text-sm font-medium text-primary mb-2">
                            💡 טיפים
                          </p>
                          {section.tips.map((tip, i) => (
                            <p
                              key={i}
                              className="text-sm text-foreground/80 mt-1"
                            >
                              {tip}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="bg-card/50 border-t border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10 font-heebo"
          >
            משאבים ולינקים
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-card rounded-xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="text-2xl mb-3">{resource.emoji}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors font-heebo">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {resource.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-heebo">
            מוכן להתחיל?
          </h2>
          <p className="text-muted-foreground mb-8">
            התקן את Claude Code, צור CLAUDE.md, ותתחיל לבנות. הכלים כבר כאן -
            רק צריך להתחיל.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://claude.com/download"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium px-8 py-3 hover:opacity-90 transition-opacity"
            >
              התקן Claude Code
            </Link>
            <Link
              href="https://github.com/eladjak/ultimate-ai-dev-environment"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-muted text-foreground font-medium px-8 py-3 hover:bg-muted/80 transition-colors"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
