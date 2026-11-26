on a new session, do not fully read the codebase; here is the summary:

portfolio is 4 static pages plus one page per post: home (centered name, headline, links), about (longer bio), writing (list of the posts array; each post opens at /writing/[id] with no ocean background), projects.
deployed to github pages as a next static export (.github/workflows/deploy.yml); no server routes.

src/components/ — site-header (sticky nav, ascii waves as its bottom border), nav-links (client, active link), theme-toggle (client; sets data-theme on html, saved in localStorage), page (title + column wrapper)
src/features/{home,about,writing,projects}/ — one component per page; writing also has post-view (a single post; plain posts use `body` in content.ts, rich ones are a component registered in post-view's richBodies, e.g. scaling-q3/ with its figures, box-essay), aside (numbered margin note, right of the column on wide screens, dim until hovered) and box-figure (client; clickable isometric box graphic used by a post via its `graphic` field)
src/features/projects/ — fleet (client; top-down ascii boats, click bobs + ripples and slides the boats into a left rail), project-view (plain viewer shown beside them, no route change)
src/features/ocean/ocean.tsx — ascii ocean background (waves, swimming fish + hammerhead, seafloor with seaweed and tripod fish); css-only animation, keyframes in globals.css; sea-clock.tsx ties fish positions to the wall clock so they persist across loads
src/lib/ — content.ts (all site copy, single source of truth), boot-script.ts (inline pre-paint script: theme + fish clock)
src/app/ — routes only; each page wraps its feature in Underwater (fish + seafloor) or Surface (top-down ripples, projects only); globals.css (all css; theme = data-theme on html, defaulting to the system setting)

plain hrefs to files in /public need the NEXT_PUBLIC_BASE_PATH prefix (see home.tsx).

minimize comments, comment lines only on logically complex or complicated changes.

do not run shell cmds unless specified to do so, summarize what was completed once finished
