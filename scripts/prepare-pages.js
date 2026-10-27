import { copyFileSync, writeFileSync } from 'node:fs';

// GitHub Pages serves this fallback for direct links into the client-side app.
copyFileSync('dist/index.html', 'dist/404.html');
writeFileSync('dist/.nojekyll', '');
