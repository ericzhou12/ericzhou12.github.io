on a new session, do not fully read the codebase; here is the summary:

portfolio is a single static page: name, bio, links, experience, projects, and writing (shown only when the posts array is non-empty).
deployed to github pages as a next static export (.github/workflows/deploy.yml); no server routes.

src/features/home/home.tsx — the whole page
src/features/ocean/ocean.tsx — ascii ocean background (waves under the header, swimming fish + hammerhead, seafloor with seaweed and tripod fish); css-only animation, keyframes in globals.css
src/lib/content.ts — all site copy, single source of truth
src/app/ — layout, page, globals.css (all css; theme follows system via prefers-color-scheme)

plain hrefs to files in /public need the NEXT_PUBLIC_BASE_PATH prefix (see home.tsx).

minimize comments, comment lines only on logically complex or complicated changes.

do not run shell cmds unless specified to do so, summarize what was completed once finished
