on a new session, do not fully read the codebase; here is the summary:

portfolio is 4 static pages: home (centered name, headline, links), about (longer bio), writing (posts array), projects.
deployed to github pages as a next static export (.github/workflows/deploy.yml); no server routes.

src/components/ — site-header (sticky nav, ascii waves as its bottom border), nav-links (client, active link), theme-toggle (client; sets data-theme on html, saved in localStorage), page (title + column wrapper)
src/features/{home,about,writing,projects}/ — one component per page
src/features/projects/ — fleet (client; top-down ascii boats, click bobs + ripples and slides the boats into a left rail), project-view (plain viewer shown beside them, no route change)
src/features/ocean/ocean.tsx — ascii ocean background (waves, swimming fish + hammerhead, seafloor with seaweed and tripod fish); css-only animation, keyframes in globals.css; sea-clock.tsx ties fish positions to the wall clock so they persist across loads
src/lib/ — content.ts (all site copy, single source of truth), boot-script.ts (inline pre-paint script: theme + fish clock)
src/app/ — routes only; each page wraps its feature in Underwater (fish + seafloor) or Surface (top-down ripples, projects only); globals.css (all css; theme = data-theme on html, defaulting to the system setting)

plain hrefs to files in /public need the NEXT_PUBLIC_BASE_PATH prefix (see home.tsx).

minimize comments, comment lines only on logically complex or complicated changes.

do not run shell cmds unless specified to do so, summarize what was completed once finished
