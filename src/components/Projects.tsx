import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles, Layers, Cpu, Layout, Globe } from "lucide-react";
import { projects, type Project } from "../data/project";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Visual accent colors for each project to give them distinct identity
const projectAccents: Record<string, { text: string; border: string }> = {
  "01": {
    text: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/30",
  },
  "02": {
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/30",
  },
  "03": {
    text: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/30",
  },
  "04": {
    text: "text-orange-500 dark:text-orange-400",
    border: "border-orange-500/30",
  },
  "05": {
    text: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-500/30",
  },
  "06": {
    text: "text-rose-500 dark:text-rose-400",
    border: "border-rose-500/30",
  },
  "07": {
    text: "text-sky-500 dark:text-sky-400",
    border: "border-sky-500/30",
  },
};

const filterTabs = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "backend", label: "Backend & Fullstack", icon: Cpu },
  { id: "ai", label: "AI & QA", icon: Sparkles },
  { id: "frontend", label: "Frontend", icon: Layout },
] as const;

type FilterId = (typeof filterTabs)[number]["id"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "backend") {
      return projects.filter((p) =>
        p.category.toUpperCase().includes("BACKEND") ||
        p.category.toUpperCase().includes("FULLSTACK") ||
        p.category.toUpperCase().includes("LOGISTICS")
      );
    }
    if (activeFilter === "ai") {
      return projects.filter((p) =>
        p.category.toUpperCase().includes("AI") ||
        p.category.toUpperCase().includes("QA")
      );
    }
    if (activeFilter === "frontend") {
      return projects.filter((p) =>
        p.category.toUpperCase().includes("FRONTEND") ||
        p.category.toUpperCase().includes("ROADMAPS")
      );
    }
    return projects;
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="border-b border-slate-300/80 py-32 transition-colors duration-300 dark:border-[#30363d] lg:ml-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400">
                02 / SELECTED WORK
              </p>
            </div>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl dark:text-[#f0f6fc]">
              Featured <span className="text-blue-600 dark:text-blue-400">Creations.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-[#8b949e]">
            A showcase of production systems, distributed backends, AI tools, and
            polished user interfaces engineered for speed and reliability.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="mt-12 flex flex-wrap gap-2.5 border-b border-slate-200/80 pb-6 dark:border-[#30363d]">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-[#8b949e] dark:hover:text-[#f0f6fc] hover:bg-slate-200/50 dark:hover:bg-[#161b22]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-blue-600 shadow-md shadow-blue-500/25"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon size={13} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Showcase with Animated Filter Transitions */}
        <div className="mt-16 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectShowcaseCard
                key={project.number}
                project={project}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

interface ProjectShowcaseCardProps {
  project: Project;
  index: number;
  isReversed: boolean;
}

function ProjectShowcaseCard({ project, index, isReversed }: ProjectShowcaseCardProps) {
  const accent = projectAccents[project.number] || {
    text: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/30",
  };

  const primaryLink =
    project.demo && project.demo !== "#"
      ? project.demo
      : project.github && project.github !== "#"
      ? project.github
      : undefined;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-300/80 bg-[#f8fafc] p-6 shadow-sm transition-all duration-500 hover:border-slate-400/80 hover:shadow-2xl sm:p-8 lg:p-10 dark:border-[#30363d] dark:bg-[#161b22] dark:hover:border-[#484f58]"
    >
      <div
        className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
          isReversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Project Info Column (5 cols) */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            {/* Number + Category Badge */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-wider text-slate-400 dark:text-[#6e7681]">
                PROJECT // {project.number}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span
                className={`rounded-full border px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-slate-200/50 dark:bg-slate-900/60 ${accent.border} ${accent.text}`}
              >
                {project.category}
              </span>
            </div>

            {/* Title with sleek hover line */}
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-[#f0f6fc]">
              {primaryLink ? (
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {project.title}
                  <ArrowUpRight
                    size={22}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 text-blue-500"
                  />
                </a>
              ) : (
                project.title
              )}
            </h3>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base md:leading-7 dark:text-[#8b949e]">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-slate-300/80 bg-slate-200/60 px-3 py-1 font-mono text-[11px] font-medium text-slate-700 transition hover:border-slate-400 dark:border-[#30363d] dark:bg-[#0d1117] dark:text-[#8b949e] dark:hover:border-slate-600 dark:hover:text-[#c9d1d9]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                <Globe size={13} />
                <span>Live Demo</span>
                <ExternalLink size={12} className="opacity-75" />
              </a>
            )}

            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-100 active:scale-95 dark:border-[#30363d] dark:bg-[#21262d] dark:text-[#e6edf3] dark:hover:border-slate-500 dark:hover:bg-[#30363d]"
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
              </a>
            )}

            {(!project.demo || project.demo === "#") && (!project.github || project.github === "#") && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-slate-200/50 px-3 py-1 text-xs text-slate-500 dark:border-[#30363d] dark:bg-[#0d1117] dark:text-[#6e7681]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In Production
              </span>
            )}
          </div>
        </div>

        {/* Screenshot / Mockup Column (7 cols) */}
        <div className="lg:col-span-7">
          {/* Window Container */}
          <div className="overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-lg transition-all duration-500 group-hover:scale-[1.01] group-hover:shadow-2xl dark:border-[#30363d] dark:bg-[#0d1117]">

              {/* Mac-style Window Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100/90 px-3.5 py-2 dark:border-[#30363d] dark:bg-[#161b22]/90">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-[#6e7681]">
                  <Globe size={11} className="text-slate-400 dark:text-[#6e7681]" />
                  <span>{project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}</span>
                </div>
              </div>

              {/* Screenshot Viewport with balanced 16:9 aspect ratio and max-height */}
              <div className="relative aspect-[16/9] max-h-[290px] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Interactive Glass Hover Overlay */}
                {primaryLink && (
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/20 backdrop-blur-[2px] opacity-0 transition-all duration-300 group-hover:opacity-100"
                    aria-label={`Open ${project.title}`}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-5 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition-transform duration-200 hover:scale-105">
                      <span>Explore Project</span>
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                )}
              </div>

            </div>
        </div>

      </div>
    </motion.article>
  );
}
