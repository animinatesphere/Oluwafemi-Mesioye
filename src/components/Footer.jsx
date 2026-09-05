import { profile } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] text-faint">
          © {year} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
          <a
            href={`mailto:${profile.email}`}
            className="link-underline text-muted transition-colors hover:text-paper"
          >
            Email
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-muted transition-colors hover:text-paper"
            >
              LinkedIn
            </a>
          )}
          <a
            href="#top"
            className="link-underline text-muted transition-colors hover:text-paper"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
