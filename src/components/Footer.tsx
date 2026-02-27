/**
 * Footer Component
 * Clean minimal footer matching dark cinematic aesthetic.
 * Sits at the bottom of the Contact section (last snap page).
 */

"use client";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Left: Wordmark */}
        <span className="footer-wordmark">Prerith.M</span>

        {/* Center: Links */}
        <div className="footer-links">
          <a
            href="https://github.com/prerithm"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub profile"
          >
            {/* GitHub icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="footer-link-label">GitHub</span>
          </a>

          <a
            href="https://medium.com/@prerithm"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="Medium blog"
          >
            {/* Medium icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
            <span className="footer-link-label">Medium</span>
          </a>
        </div>

        {/* Right: Copyright */}
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} Prerith M
        </span>

      </div>
    </footer>
  );
}
