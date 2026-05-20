import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { personal } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-accent/40 bg-accent/10 font-mono text-[10px] font-bold text-accent">
            A
          </span>
          <p className="font-mono text-[11px] text-fg-subtle">
            © {new Date().getFullYear()} {personal.name}
          </p>
        </div>
        <p className="font-mono text-[11px] text-fg-subtle">
          Built with Next.js · Deployed on Vercel
        </p>
        <div className="flex items-center gap-2">
          {[
            { href: personal.github, label: "GitHub", icon: <FaGithub size={13} /> },
            { href: personal.linkedin, label: "LinkedIn", icon: <FaLinkedinIn size={12} /> },
            { href: `mailto:${personal.email}`, label: "Email", icon: <Mail size={13} /> },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-fg-muted transition-all hover:border-accent/50 hover:text-accent"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
