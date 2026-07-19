import {
  BookOpen,
  Code2,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const exploreLinks = [
  { label: "Learning Resources", href: "/resources" },
  { label: "AI Study Planner", href: "/ai/study-planner" },
  { label: "Recommendations", href: "/ai/recommendations" },
  { label: "My Study Plans", href: "/my-plans" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Help & Support", href: "/support" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
              <Sparkles className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xl font-bold text-white">
                LearnPilot
              </p>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Agentic AI
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            An intelligent learning platform that creates
            personalized study plans, recommends useful
            resources and helps learners track progress.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white"
            >
              <Code2 className="h-5 w-5" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-white"
            >
              <BriefcaseBusiness className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterColumn
          title="Explore"
          links={exploreLinks}
        />

        <FooterColumn
          title="Company"
          links={companyLinks}
        />

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />

              <a
                href="mailto:support@learnpilot.app"
                className="transition hover:text-white"
              >
                support@learnpilot.app
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />

              <span>Dhaka, Bangladesh</span>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

              <span>Available for learners worldwide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} LearnPilot AI. All
            rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block text-sm transition hover:text-cyan-400"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}