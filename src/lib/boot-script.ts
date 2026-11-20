// Inlined in the root layout so it runs before first paint. Kept out of the
// "use client" files: a server component cannot read string exports from those.

// A saved choice wins, otherwise follow the system.
const theme =
  "try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}";

// Time of day the fish were mounted; see features/ocean/sea-clock.tsx.
const seaClock = "document.documentElement.style.setProperty('--now',(Date.now()/1000%86400)+'s')";

export const bootScript = `${theme};${seaClock}`;
